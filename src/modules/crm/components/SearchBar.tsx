type SearchBarProps = {
  value: string
  onChange: (value: string) => void
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="crm-searchbar">
      <span className="crm-searchbar__label">Pesquisar</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Nome ou empresa"
      />
    </label>
  )
}

export default SearchBar
