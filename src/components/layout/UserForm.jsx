import { useState } from "react";
import EditableImage from "./EditableImage";
import { useProfile } from "../UseProfile";
import AddressInputs from "@/components/layout/AddressInputs";

export default function UserForm({user, onSave}) {
    const [userName, setUserName] = useState(user?.name || '');
    const [image, setImage] = useState(user?.image || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
    const [postalCode, setPostalCode] = useState(user?.postalCode || '');
    const [city, setCity] = useState(user?.city || '');
    const [country, setCountry] = useState(user?.country || '');
    const [admin, setAdmin] = useState(user?.admin || false);

    const {data:loggedInUserData} = useProfile();

    function handleAddressChange(propName, value) {
        if (propName === 'phone') setPhone(value);
        if (propName === 'streetAddress') setStreetAddress(value);
        if (propName === 'postalCode') setPostalCode(value);
        if (propName === 'city') setCity(value);
        if (propName === 'country') setCountry(value);
    }

    return (
        <div className="md:flex gap-4">
                <div>
                    <div className="p-2 rounded-lg relative max-w-[120px]">
                        <EditableImage link={image} setLink={setImage}/>
                    </div>
                </div>
                <form className="grow" onSubmit={ev => onSave(ev, {name: userName, image, phone, streetAddress, country, city, postalCode, admin,})}>
                        <label>Full name</label>
                        <input type="text" value={userName} placeholder="First and Last name" onChange={ev => setUserName(ev.target.value)}/>
                        <label>Email</label>
                        <input type="email" disabled={true} value={user.email} placeholder={"Email"}/>
                        <AddressInputs 
                            addressProps={{phone, streetAddress, postalCode, city, country,}} 
                            setAddressProp={handleAddressChange} 
                        />
                        {loggedInUserData.admin && (
                            <div>
                                <label className="p-2 inline-flex items-center gap-2 block mb-2" htmlFor="adminCb">
                                    <input id="adminCb" type="checkbox" value={'1'} checked={admin} onChange={ev => setAdmin(ev.target.checked)}/>
                                    <span>Admin</span>
                                </label>
                            </div>
                        )}
                        <button type="submit">Save</button>
                </form>
            </div>
    )
}