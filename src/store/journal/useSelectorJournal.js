import { useSelector } from 'react-redux';

export const useSelectorJournal = () => useSelector(({ journal }) => journal);
