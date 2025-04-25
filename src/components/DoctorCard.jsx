import React from "react";

export default function DoctorCard({ doctor }) {
  return (
    <div data-testid="doctor-card">
      <h3 data-testid="doctor-name">{doctor.name}</h3>
      <p data-testid="doctor-specialty">
        {Array.isArray(doctor.specialties)
          ? doctor.specialties.join(", ")
          : "No specialties available"}
      </p>
      <p data-testid="doctor-experience">Experience: {doctor.experience} yrs</p>
      <p data-testid="doctor-fee">Fee: ₹{doctor.fees}</p>
    </div>
  );
}
