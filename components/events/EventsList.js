import EventItem from "./event-item";
export default function EventsList(props){
    const {items} = props;
    return <ul>
        {items.map((event)=><EventItem/>)}
    </ul>
}