"use client";

import { useState } from "react";

const questions = [
  {
    question: "Do I need an Apple Watch or another wearable?",
    answer:
      "No. Cardiom is designed around the cameras already built into your iPhone. You can also add readings from devices you use separately, such as a blood-pressure cuff or pulse oximeter.",
  },
  {
    question: "Can Cardiom measure blood pressure, oxygen or glucose?",
    answer:
      "Those values are entered manually from a dedicated device or another trusted source. Cardiom does not claim to measure them through the camera.",
  },
  {
    question: "What is the difference between Finger PPG and Face rPPG?",
    answer:
      "Finger PPG is a contact check-in: you place a fingertip over the rear camera and flash so Cardiom can read light changes from blood flow. Face rPPG is contactless — the front camera scans your face and detects tiny colour changes linked to your pulse. Cardiom labels each method and lets you compare Finger and Face trends separately.",
  },
  {
    question: "Can I measure pulse by scanning my face?",
    answer:
      "Yes. Choose Face rPPG for a contactless reading. Keep your face in the guide, use even light from in front of you, and stay still. Soft daylight or a lamp in front of your face usually works better than strong light from behind.",
  },
  {
    question: "When do HRV and the 7-day Stress Index appear?",
    answer:
      "HRV details appear only when a session contains a suitable beat-to-beat signal. The 7-day Stress Index unlocks after check-ins on seven distinct days so it can reflect a longer pattern.",
  },
  {
    question: "Is Cardiom a medical device?",
    answer:
      "No. Cardiom is a personal wellness tracker. It does not diagnose, treat or replace professional medical advice, validated devices or emergency care.",
  },
  {
    question: "Can I delete or export my data?",
    answer:
      "Yes. Cardiom includes data controls, account sync, deletion options and downloadable wellness reports. Our Privacy Policy explains how each category is handled.",
  },
];

export function FaqList() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {questions.map((item, index) => {
        const expanded = active === index;
        return (
          <div className="faq-item" key={item.question}>
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setActive(expanded ? null : index)}
            >
              <span>{item.question}</span>
              <i>{expanded ? "−" : "+"}</i>
            </button>
            <div className={expanded ? "faq-answer faq-answer-open" : "faq-answer"}>
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
