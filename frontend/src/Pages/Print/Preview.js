import react, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Logo from '../../Assets/Logo/label.png'

import './Print.css'
export default function Preview() {
    const [setting, setSetting] = useState([])
    const [previewSettings, setPreviewSettings] = useState([])
    const [infoCust, setInfoCust] = useState([])
    const { id } = useParams();

    const previewSetting = async () => {
        const url = await axios.get(`/api/preview/${id}`)
        const data = await url.data
        console.log(data)
        const getAddress = await axios.get(`/api/getAddress/${data.kodepos}/${data.kelurahan}`)
        const result = await getAddress.data

        if (result.length > 0) {
            setInfoCust(result[0])
        } else {
            setInfoCust('')
        }

        setPreviewSettings(data)
    }

    useEffect(() => {
        previewSetting()
    }, [])

    const Settings = async () => {
        await axios.get('/api/settings')
            .then(res => setSetting(res.data))
    }

    useEffect(() => {
        Settings()
    }, [])

    return (
        <>
            {/* <div className="print__preview">
                <div className="print__preview__header">
                    <div className="print__preview__header__image">
                        <img src={Logo} alt="Logo" />
                    </div>
                    <div className="print__preview__header__setting">
                        <table>
                            <tbody>
                                <tr>
                                    <td>{setting.phone_}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div> */}



            <div className="print__wrapper">
                <div className="print__header">
                    <div className="print__logo d-block text-center">
                        <img src={Logo} alt="logo" />
                    </div>
                </div>
                <div className="print__setting">
                    {
                        setting.filter(value => value.key === "alamat").map((value, index) => {
                            return <p className=" text-center mt-2 alamat " key={index}>{value.value}</p>
                        })
                    }
                    <div className="not-alamat">
                        {
                            setting.filter(value => value.key !== "alamat").map((value, index) => {
                                return (

                                    <div className="mx-4 " key={index}>
                                        <p key={index} className=" text-center" >{value.value}</p>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
                <div className="print__content mt-5" >
                    <pre>
                        <p>{previewSettings.kode_customer}</p>
                        <p className="fw-bold">KEPADA YTH : {previewSettings.nama} </p>
                        <p >D/A       :  {previewSettings.alamat} </p>
                        <p>Provinsi  :  {infoCust.provinsi ? infoCust.provinsi : ''},</p>
                        <p>Kecamatan :  {infoCust.kecamatan ? infoCust.kecamatan : ''},</p>
                        <p>Kelurahan :  {infoCust.kelurahan ? infoCust.kelurahan : ''} - {previewSettings.kodepos_customer ? previewSettings.kodepos_customer : ''}</p>
                        <p>UP        :  {previewSettings.pic} </p>
                    </pre>
                </div>

            </div>
        </>
    )
}

