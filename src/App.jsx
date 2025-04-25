import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import DoctorCard from "./components/DoctorCard";
import { useSearchParams } from "react-router-dom";
import { applyFiltersAndSorting } from "./utils/queryUtils";

const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

export default function App() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setDoctors(data));
  }, []);

  useEffect(() => {
    const updatedList = applyFiltersAndSorting(doctors, searchParams);
    setFilteredDoctors(updatedList);
  }, [doctors, searchParams]);

  return (
    <div className="app">
      <h2>Doctor Listing</h2>
      <SearchBar doctors={doctors} setSearchParams={setSearchParams} />
      <FilterPanel setSearchParams={setSearchParams} searchParams={searchParams} />
      <div className="doctor-list">
        {filteredDoctors.map(doc => (
          <DoctorCard key={doc.id} doctor={doc} />
        ))}
      </div>
    </div>
  );
}
