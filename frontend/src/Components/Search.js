export default function Search() {
    return (
        <input type="text" placeholder="Cari data" onChange={e => e.target.value} />
    )
}