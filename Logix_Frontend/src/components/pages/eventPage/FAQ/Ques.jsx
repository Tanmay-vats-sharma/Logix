import { useState } from "react";
const Ques = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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
    <div className="h-[48vh] w-[97vw] lg:w-[47%] lg:h-[70vh]">
      <div className="h-[100%] w-[100%] lg:w-[100%] lg:h-[100%]  flex flex-col justify-evenly items-center ">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-purple-500 w-[95%]">
            <button
              className="w-full text-left px-4 py-3    text-xl lg:text-2xl neon-neutral-text"
              onClick={() => toggleAnswer(index)}
            >
              {faq.question}
            </button>
            {openIndex === index && (
              <div className="px-4 py-2 text-xl text-gray-300 transition-all duration-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ques;