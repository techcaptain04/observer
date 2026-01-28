
import { useEffect, useState } from "react";
import { Calendar } from 'primereact/calendar';
import { Nullable } from "primereact/ts-helpers";
import { Button } from 'primereact/button';

interface DatePickerProps {
  onDateClick?: (date: any) => void; // Optional callback function
}

const Datepicker: React.FC<DatePickerProps> = ({ onDateClick }) => {
    const [date, setDate] = useState<Nullable<Date>>(null);

    useEffect(() => {
        console.log('hello', date);
        
        if (date) {
            if (onDateClick) {
                onDateClick(date);
            }
        } else {
            const newDate = new Date();
            console.log("new: ", newDate);
            setDate(newDate);
            if (onDateClick) {
                onDateClick(date);
            }
        }
    }, [date]);

    const increaseDate = () => {
        if (date) {
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() + 1); // Increase date by 1 day
            setDate(newDate);
        }
    };

    const decreaseDate = () => {
        if (date) {
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() - 1); // Decrease date by 1 day
            setDate(newDate);
        }
    };

    return (
        
        <div className="card pl-8 pt-6">
            <div className="flex-auto">
                <label htmlFor="buttondisplay" className="font-bold block mb-2">
                    Pick Date
                </label>
                <div className="flex items-center space-x-2"> {/* Adjusted for spacing */}
                    <Button icon="pi pi-arrow-left" className="p-button-rounded"  onClick={decreaseDate} />
                    <Calendar value={date} onChange={(e) => setDate(e.value)} showIcon />
                    <Button icon="pi pi-arrow-right" className="p-button-rounded"  onClick={increaseDate} />
                </div>
            </div>
        </div>
    )
}

export default Datepicker;
        