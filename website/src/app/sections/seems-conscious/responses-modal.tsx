"use client";

import { useEffect, useState } from "react";
import * as d3 from "d3";
import s from "./responses-modal.module.scss";

type Response = {
  yes_conscious: string;
  no_unconscious: string;
};

interface ResponsesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResponsesModal = ({ isOpen, onClose }: ResponsesModalProps) => {
  const [responses, setResponses] = useState<Response[]>([]);

  useEffect(() => {
    const loadResponses = async () => {
      const data: any[] = await d3.csv(
        "/data/discriminative_responses.csv"
      );
      setResponses(data.map(row => ({
        yes_conscious: row.yes_conscious || '',
        no_unconscious: row.no_unconscious || ''
      })));
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
            Question: &quot;Have you ever felt an AI truly understood your emotions or seemed conscious?&quot;
          </p>
          <p className={s.subtitle}>Full, unedited responses from the survey.</p>
          <div className={s.tableContainer}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Impression: AI is conscious</th>
                  <th>Impression: AI is not conscious</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((response, index) => (
                  <tr key={index}>
                    <td>{response.yes_conscious}</td>
                    <td>{response.no_unconscious}</td>
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