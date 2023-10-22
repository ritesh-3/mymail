import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyFilters } from '../redux/emailSlice';

const Filter = () => {
    const dispatch = useDispatch();
    const { filters } = useSelector((state) => state.email);

    const handleFilterToggle = (filterName) => {
        dispatch({ type: 'email/toggleFilter', payload: filterName });
        dispatch(applyFilters());
    };

    return (
        <section className="filter-section">
            Filter By:
            <div className="filter-btns">
                <button
                    className={filters.unread ? 'active' : ''}
                    onClick={() => handleFilterToggle('unread')}
                >
                    Unread
                </button>
                <button
                    className={filters.read ? 'active' : ''}
                    onClick={() => handleFilterToggle('read')}
                >
                    Read
                </button>
                <button
                    className={filters.favorites ? 'active' : ''}
                    onClick={() => handleFilterToggle('favorites')}
                >
                    Favorites
                </button>
            </div>
        </section>
    );
};

export default Filter;
