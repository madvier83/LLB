export default function Form({ children, method }) {
    return (
        <>
            <form onSubmit={method}>

                {children}

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </>
    )
}