import React, { useState } from 'react';

// تعریف تایپ برای props کامپوننت
interface QuestionCardProps {
    question: {
        id: number;
        text: string;
        options: {
            A: string;
            B: string;
            C: string;
            D: string;
        };
        correctAnswer: string;
        explanation: string;
    };
    index: number;
    selectedOption?: string;
    onOptionSelect: (questionId: number, optionValue: string) => void;
}

// تعریف تایپ برای لیبل‌ها
interface OptionLabels {
    A: string;
    B: string;
    C: string;
    D: string;
}

function QuestionCard({ question, index, selectedOption, onOptionSelect }: QuestionCardProps) {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const getOptionLabel = (optionKey: string): string => {
        const labels: OptionLabels = {
            A: 'گزینه ۱',
            B: 'گزینه ۲',
            C: 'گزینه ۳',
            D: 'گزینه ۴'
        };
        return labels[optionKey as keyof OptionLabels] || optionKey;
    };

    return (
        <div className={`question-card ${selectedOption ? 'answered' : ''}`}>
            <div className="question-header" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="question-number">
                    <span className="number-badge">سوال {index}</span>
                    {selectedOption && (
                        <span className="answered-badge">✓ پاسخ داده شده</span>
                    )}
                </div>
                <div className="question-toggle">
                    {isExpanded ? '▲' : '▼'}
                </div>
            </div>
            
            <div className={`question-content ${isExpanded ? 'expanded' : ''}`}>
                <h3 className="question-text">{question.text}</h3>
                
                <div className="options-list">
                    {Object.entries(question.options).map(([key, value]) => (
                        <label key={key} className={`option-item ${selectedOption === key ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={key}
                                checked={selectedOption === key}
                                onChange={() => onOptionSelect(question.id, key)}
                                className="option-radio"
                            />
                            <span className="option-letter">{getOptionLabel(key)}</span>
                            <span className="option-text">{value as string}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default QuestionCard;