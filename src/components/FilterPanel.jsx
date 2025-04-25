import React from "react";

const specialties = [
  "General Physician", "Dentist", "Dermatologist", "Paediatrician", "Gynaecologist", "ENT",
  "Diabetologist", "Cardiologist", "Physiotherapist", "Endocrinologist", "Orthopaedic",
  "Ophthalmologist", "Gastroenterologist", "Pulmonologist", "Psychiatrist", "Urologist",
  "Dietitian/Nutritionist", "Psychologist", "Sexologist", "Nephrologist", "Neurologist",
  "Oncologist", "Ayurveda", "Homeopath"
];

export default function FilterPanel({ setSearchParams, searchParams }) {
  const moc = searchParams.get("moc");
  const sort = searchParams.get("sort");
  const selectedSpecs = searchParams.getAll("specialties");

  const handleRadio = val => {
    setSearchParams(params => {
      params.set("moc", val);
      return params;
    });
  };

  const handleCheckbox = val => {
    setSearchParams(params => {
      const current = new Set(params.getAll("specialties"));
      current.has(val) ? current.delete(val) : current.add(val);
      params.delete("specialties");
      current.forEach(s => params.append("specialties", s));
      return params;
    });
  };

  const handleSort = val => {
    setSearchParams(params => {
      params.set("sort", val);
      return params;
    });
  };

  return (
    <div>
      <h3 data-testid="filter-header-moc">Consultation Mode</h3>
      <label>
        <input data-testid="filter-video-consult" type="radio" name="moc" checked={moc === "Video Consult"} onChange={() => handleRadio("Video Consult")} />
        Video Consult
      </label>
      <label>
        <input data-testid="filter-in-clinic" type="radio" name="moc" checked={moc === "In Clinic"} onChange={() => handleRadio("In Clinic")} />
        In Clinic
      </label>

      <h3 data-testid="filter-header-speciality">Speciality</h3>
      {specialties.map(s => (
        <label key={s}>
          <input
            data-testid={`filter-specialty-${s.replace(/[\s/]/g, "-")}`}
            type="checkbox"
            checked={selectedSpecs.includes(s)}
            onChange={() => handleCheckbox(s)}
          />
          {s}
        </label>
      ))}

      <h3 data-testid="filter-header-sort">Sort</h3>
      <label>
        <input data-testid="sort-fees" type="radio" name="sort" checked={sort === "fees"} onChange={() => handleSort("fees")} />
        Fees
      </label>
      <label>
        <input data-testid="sort-experience" type="radio" name="sort" checked={sort === "experience"} onChange={() => handleSort("experience")} />
        Experience
      </label>
    </div>
  );
}
