export function applyFiltersAndSorting(doctors, searchParams) {
    let filtered = [...doctors];
  
    const search = searchParams.get("search")?.toLowerCase() || "";
    const moc = searchParams.get("moc");
    const sort = searchParams.get("sort");
    const specialties = searchParams.getAll("specialties");
  
    if (search)
      filtered = filtered.filter(doc => doc.name.toLowerCase().includes(search));
  
    if (moc)
      filtered = filtered.filter(doc => doc.mode === moc);
  
    if (specialties.length)
      filtered = filtered.filter(doc => specialties.some(s => doc.specialties.includes(s)));
  
    if (sort === "fees")
      filtered.sort((a, b) => a.fees - b.fees);
    else if (sort === "experience")
      filtered.sort((a, b) => b.experience - a.experience);
  
    return filtered;
  }
  