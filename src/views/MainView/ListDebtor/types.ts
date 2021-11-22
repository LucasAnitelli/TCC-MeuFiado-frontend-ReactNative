export interface ListProps {
    handleRemove?: () => void;
    data: {
        nameDebtor: string;
        date: string;
        value: string;
        product: string;
    }
    editClick?: () => void;
}