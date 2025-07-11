"use client";

import { useEffect, useState, useMemo } from "react";
import * as d3 from "d3";
import s from "./responses-modal.module.scss";

interface Response {
  id: string;
  type: 'yes' | 'no';
  text: string;
  isExpanded?: boolean;
}

interface ResponsesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResponsesModal = ({ isOpen, onClose }: ResponsesModalProps) => {
  const [responses, setResponses] = useState<Response[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'yes' | 'no'>('yes');
  const [expandedResponses, setExpandedResponses] = useState(new Set<string>());

  useEffect(() => {
    const loadResponses = async () => {
      const data: any[] = await d3.csv("/data/discriminative_responses.csv");
      
      const processedResponses: Response[] = [];
      
      // Process yes_conscious responses
      data.forEach((row, index) => {
        if (row.yes_conscious && row.yes_conscious.trim()) {
          processedResponses.push({
            id: `yes-${index}`,
            type: 'yes',
            text: row.yes_conscious.trim()
          });
        }
      });

      // Process no_unconscious responses
      data.forEach((row, index) => {
        if (row.no_unconscious && row.no_unconscious.trim()) {
          processedResponses.push({
            id: `no-${index}`,
            type: 'no',
            text: row.no_unconscious.trim()
          });
        }
      });

      setResponses(processedResponses);
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

  const filteredResponses = useMemo(() => {
    return responses.filter(response => {
      const matchesSearch = response.text.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = response.type === selectedFilter;
      return matchesSearch && matchesFilter;
    });
  }, [responses, searchTerm, selectedFilter]);

  const stats = useMemo(() => {
    const yesCount = responses.filter(r => r.type === 'yes').length;
    const noCount = responses.filter(r => r.type === 'no').length;
    return { yesCount, noCount, total: responses.length };
  }, [responses]);

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedResponses);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedResponses(newExpanded);
  };

  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const getQuestionForType = (type: 'yes' | 'no') => {
    if (type === 'yes') {
      return "What specific thing(s) did the AI say or do that gave you the impression that it understood your emotions or seemed conscious?";
    } else {
      return "What specific thing(s) would the AI need to say or do to give you the impression that it understood your emotions or seemed conscious?";
    }
  };

  if (!isOpen) return null;

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <button className={s.closeButton} onClick={onClose}>
          &times;
        </button>
        
        <div className={s.content}>
          <div className={s.header}>
            <h2 className={s.title}>What People Said</h2>
            <p className={s.mainQuestion}>
              "Have you ever felt an AI truly understood your emotions or seemed conscious?"
            </p>
            <p className={s.subtitle}>Full, unedited responses from the survey.</p>
          </div>

          <div className={s.controls}>
            <div className={s.searchContainer}>
              <input
                type="text"
                placeholder="Search responses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={s.searchInput}
              />
            </div>
            
            <div className={s.filterContainer}>
              <button
                className={`${s.filterButton} ${selectedFilter === 'yes' ? s.active : ''}`}
                onClick={() => setSelectedFilter('yes')}
              >
                Yes ({stats.yesCount})
              </button>
              <button
                className={`${s.filterButton} ${selectedFilter === 'no' ? s.active : ''}`}
                onClick={() => setSelectedFilter('no')}
              >
                No ({stats.noCount})
              </button>
            </div>
          </div>

          <div className={s.followUpQuestionContainer}>
            <p className={s.followUpQuestion}>
              {getQuestionForType(selectedFilter)}
            </p>
          </div>

          <div className={s.responsesContainer}>
            {filteredResponses.length === 0 ? (
              <div className={s.emptyState}>
                <p>No responses found matching your search.</p>
              </div>
            ) : (
              <div className={s.responsesList}>
                {filteredResponses.map((response) => (
                  <div
                    key={response.id}
                    className={`${s.responseCard} ${s[response.type]}`}
                  >
                    <div className={s.responseContent}>
                      {expandedResponses.has(response.id) || response.text.length <= 120 ? (
                        <p className={s.responseText}>"{response.text}"</p>
                      ) : (
                        <p className={s.responseText}>"{truncateText(response.text)}"</p>
                      )}
                      
                      {response.text.length > 120 && (
                        <button
                          onClick={() => toggleExpanded(response.id)}
                          className={s.expandButton}
                        >
                          {expandedResponses.has(response.id) ? 'Show less' : 'Show more'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={s.footer}>
            <p className={s.footerText}>
              {filteredResponses.length} of {stats[selectedFilter === 'yes' ? 'yesCount' : 'noCount']} responses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 