import { TTableWithReservation } from "@/types/table-types";

export const parseDate = (dateString: string): Date | undefined => {
  const dateParts = dateString.split(".");
  if (dateParts.length !== 3) {
    return undefined; // Неправильный формат даты
  }

  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Месяцы в JavaScript начинаются с 0
  const year = parseInt(dateParts[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return undefined; // Некорректные числовые значения для даты
  }

  return new Date(year, month, day);
};

export const parseTime = (timeString: string): Date | undefined => {
  const timeParts = timeString.split(":");
  if (timeParts.length !== 2) {
    return undefined; // Неправильный формат времени
  }

  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);

  if (
    isNaN(hours) ||
    isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return undefined; // Некорректные значения для времени
  }

  return new Date(0, 0, 0, hours, minutes);
};

export const getMinReservationTime = (
  table: TTableWithReservation,
  selectedDate: Date
) => {
  const reservationsForSelectedDate = table?.reservation.filter(
    (reservation) =>
      reservation.reservationDate === selectedDate?.toLocaleDateString()
  );

  if (
    !reservationsForSelectedDate ||
    reservationsForSelectedDate.length === 0
  ) {
    return { minTime: undefined };
  }

  let minTime = reservationsForSelectedDate[0].reservationTime;

  reservationsForSelectedDate.forEach((reservation) => {
    const parsedReservationTime = parseTime(
      reservation.reservationTime
    )?.toLocaleTimeString();
    const parsedMinTime = parseTime(minTime)?.toLocaleTimeString();

    if (parsedReservationTime! < parsedMinTime!) {
      minTime = reservation.reservationTime;
    }
  });

  return { minTime };
};
