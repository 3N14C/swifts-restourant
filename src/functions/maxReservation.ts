import { TTableWithReservation } from "@/types/table-types";
import moment from "moment";

// export const getMaxreservationTableTime = (table: TTableWithReservation) => {
//   let maxReservation = { date: "2030-01-01", time: "00:00" };

//   if (table.reservation?.length > 0) {
//     table.reservation?.forEach((reservation) => {
//       const reservationDate = moment(reservation.reservationDate).format(
//         "YYYY-MM-DD"
//       );
//       const reservationTime = moment(reservation.reservationDate).format(
//         "HH:mm"
//       );

//       if (
//         moment(`${reservationDate} ${reservationTime}`).isBefore(
//           moment(`${maxReservation.date} ${maxReservation.time}`)
//         )
//       ) {
//         return (maxReservation = {
//           date: reservationDate,
//           time: reservationTime,
//         });
//       }
//     });

//     console.log(
//       `Самая поздняя бронь для столика @tableID ${table.id}: ${maxReservation.date} ${maxReservation.time}`
//     );
//     return maxReservation;
//   }
// };

// export const getMinReservationTime = (table: TTableWithReservation) => {
//   let minReservation = { date: reserv, time: "00:00" };

//   if (table?.reservation?.length > 0) {
//     table.reservation?.forEach((reservation) => {
//       const reservationDate = moment(reservation.reservationDate).format(
//         "YYYY-MM-DD"
//       );
//       const reservationTime = moment(reservation.reservationDate).format(
//         "HH:mm"
//       );

//       if (
//         moment(`${reservationDate} ${reservationTime}`).isBefore(
//           moment(`${minReservation.date} ${minReservation.time}`)
//         )
//       ) {
//         return (minReservation = {
//           date: reservationDate,
//           time: reservationTime,
//         });
//       }
//     });
//   }
// };
