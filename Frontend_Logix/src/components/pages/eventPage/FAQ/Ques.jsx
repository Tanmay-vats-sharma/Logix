import { useState } from "react";
import { Plus } from "lucide-react"
import useObserver from "../../../Layout/useObserver";
const Ques = () => {
  const block = useObserver({ once: true })
  const [openIndex, setOpenIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleAnswer = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);

    setTimeout(() => {
      setOpenIndex(openIndex === index ? null : index);
      setIsAnimating(false);
    }, 200); 
  };

  const faqs = [
    {
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces.",
    },
    {
      question: "What is Tailwind CSS?",
      answer:
        "Tailwind CSS is a utility-first CSS framework for designing modern websites.",
    },
    {
      question: "How does useState work?",
      answer:
        "useState is a React hook that allows you to manage component state.",
    },
    {
      question: "What is JSX?",
      answer:
        "JSX is a syntax extension for JavaScript that allows writing HTML inside React.",
    },
  ];

  return (
    <div ref={block.ref} className="h-[48vh] w-[97vw] lg:w-[47%] lg:h-[70vh]">
      {block.isVisible && (
        <div className="h-[100%] w-[100%] lg:w-[100%] lg:h-[100%] flex flex-col justify-evenly items-center motion-translate-x-in-[25%] motion-translate-y-in-[0%]  motion-delay-[0ms]/translate motion-ease-linear motion-opacity-in-[0%] motion-duration-[800ms] motion-delay-[100ms] motion-duration-[1900ms]/opacity motion-delay-[0ms]/opacity">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-purple-500 w-[95%]">
              <button
                className="w-full flex justify-between items-center px-4 py-3 text-xl lg:text-2xl neon-neutral-text"
                onClick={() => toggleAnswer(index)}
              >
                <span>{faq.question}</span>
                <div
                  className={`transition-transform duration-[600ms] ease-in-out ${
                    openIndex === index ? "rotate-[405deg]" : "rotate-0"
                  }`}
                >
                  <Plus />
                </div>
              </button>
              <div
                className={`overflow-hidden transition-max-height duration-[600ms] ease-in-out ${
                  openIndex === index
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 py-2 text-xl text-gray-300">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ques;
