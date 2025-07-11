"use client";

import { useEffect, useState } from "react";
import * as d3 from "d3";
import s from "./uncomfortable-responses-modal.module.scss";

type Response = {
  id: string;
  response: string;
  theme: string;
};

interface UncomfortableResponsesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UncomfortableResponsesModal = ({ isOpen, onClose }: UncomfortableResponsesModalProps) => {
  const [responses, setResponses] = useState<Response[]>([]);

  useEffect(() => {
    const loadResponses = async () => {
      try {
        const data: any[] = await d3.csv("/data/uncomfortable_themes.csv");
        setResponses(data.map(row => ({
          id: row.id || '',
          response: row.Response || '',
          theme: row.Theme || ''
        })));
      } catch (error) {
        console.error("Failed to load responses:", error);
      }
    };

    if (isOpen) {
      loadResponses();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <button className={s.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={s.content}>
          <h2 className={s.title}>What People Said</h2>
          <p className={s.question}>
            Question: &quot;Describe a concrete scenario where you would feel uncomfortable with an AI making a decision instead of a human. What specific aspects make you uneasy?&quot;
          </p>
          <p className={s.subtitle}>Full, unedited responses from the survey.</p>
          <div className={s.tableContainer}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Response</th>
                  <th>Theme</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((response) => (
                  <tr key={response.id}>
                    <td>{response.response}</td>
                    <td>{response.theme}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}; 