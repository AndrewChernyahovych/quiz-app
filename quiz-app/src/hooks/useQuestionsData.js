import { useTranslation } from "react-i18next";

export const useQuestionData = () => {
  const { t } = useTranslation();

  return [
    {
      id: 1,
      title: "preferredLanguage",
      type: "single-select",
      answerOptions: ["English", "French", "German", "Spanish"]
    },
    {
      id: 2,
      title: "whatGender",
      type: "single-select-image",
      answerOptions: t("whatGender.answerOptions", { returnObjects: true }),
    },
    {
      id: 3,
      title: "whatAge",
      type: "single-select",
      answerOptions: t("whatAge.answerOptions", { returnObjects: true }),
    },
    {
      id: 4,
      title: "whatHateInBooks",
      type: "multiple-select",
      answerOptions: t("whatHateInBooks.answerOptions", {
        returnObjects: true,
      }),
    },
    {
      id: 5,
      title: "whatFavoriteTopics",
      type: "bubble",
      answerOptions: t("whatFavoriteTopics.answerOptions", {
        returnObjects: true,
      }),
    },
  ];
};
