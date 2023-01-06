import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    items: Array<{ label: string, to: string }>;
}

export const Menu: React.FC<Props> = ({ items }) => (
    <ul className="menu">
        {items.map(item => (
            <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
            </li>
        ))}
    </ul>
);
