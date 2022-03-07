export default function Select({ children, value, name }) {
    return (
        <div className="mb-4">
            <select class="form-select" name={name} aria-label="Default select example" required>
                {children}
            </select>
        </div>
    )
}