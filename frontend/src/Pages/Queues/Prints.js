import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const Prints = () => {
    const { id_customers } = useParams()
    const [fax, setFax] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [wa, setWa] = useState('')
    const [address, setAddress] = useState('')
    useEffect(() => {
        const getData = async () => {
            const url = await axios.get(`/api/preview/${id_customers}`)
            const data = await url.data[0]
            console.log(data)
        }
        getData()
    })
    const Settings = async () => {
        await axios.get('/api/settings')
            .then(res => {

                // take value from setting where key is fax
                const fax = res.data.filter(val => val.key === 'fax')
                setFax(fax[0].value)
                // take value from setting where key is email
                const email = res.data.filter(val => val.key === 'email')
                // take value from setting where key is phone
                setEmail(email[0].value)
                // take value from setting where key is phone
                const phone = res.data.filter(val => val.key === 'nomer_handphone')
                setPhone(phone[0].value)

                // take value from where key is whatsapp number
                const whatsapp = res.data.filter(val => val.key === 'whatsapp_number')
                setWa(whatsapp[0].value)

                // take value from where key is alamat
                const address = res.data.filter(val => val.key === 'alamat')
                setAddress(address[0].value)
            }
            )
    }

    useEffect(() => {
        Settings()
    }, [])
    return (
        <div>Prints</div>
    )
}

export default Prints