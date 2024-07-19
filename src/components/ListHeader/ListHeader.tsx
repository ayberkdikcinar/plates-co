import './ListHeader.css';
interface ListHeaderProps {
  label: string;
}
export default function ListHeader({ label }: ListHeaderProps) {
  return <div className='list-header'>{label}</div>;
}
