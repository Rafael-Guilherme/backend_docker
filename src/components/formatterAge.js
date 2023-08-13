import { differenceInMonths, format } from "date-fns";

function birthday(dateString) {
  const date = new Date(dateString);
  return format(date, "dd/MM/yyyy");
}

function yearsOldWithMonth(dateString) {
  const today = Date.now();

  const month_years_old = differenceInMonths(today, new Date(dateString));

  const months = Math.floor(month_years_old / 12);
  const years = month_years_old % 12;

  return `${months} ano(s) e ${years} mês(es)`;
}

const formatterAge = {
  date: {
    yearsOldWithMonth,
    birthday,
  },
};

export default formatterAge;
