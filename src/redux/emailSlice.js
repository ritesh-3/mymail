import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    emails: [],
    loading: 'idle',
    error: null,
    favorites: [],
    readEmails: [],
    emailBody: null,
    selectedEmail: null,
    filters: {
        read: false,
        unread: false,
        favorites: false,
    },

};

export const fetchEmails = createAsyncThunk('email/fetchEmails', async (page = 1) => {
    try {
        const response = await fetch(`https://flipkart-email-mock.now.sh/?page=${page}`);
        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const fetchEmailBody = createAsyncThunk('email/fetchEmailBody', async ({ emailId, email }, { dispatch }) => {
    try {
        const response = await fetch(`https://flipkart-email-mock.now.sh/?id=${emailId}`);
        dispatch(selectedEmail(null))
        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }
        const data = await response.json();
        dispatch(selectedEmail(email));
        dispatch(markAsRead(emailId));
        return data;
    } catch (error) {
        dispatch(selectedEmail(null))
        throw new Error(error.message);
    }
});

const emailSlice = createSlice({
    name: 'email',
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            const id = action.payload;
            // Check if the email ID is not already in the "favorites" array
            if (!state.favorites.includes(id)) {
                state.favorites.push(id);
            }
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter((id) => id !== action.payload);
        },
        markAsRead: (state, action) => {
            const emailId = action.payload;

            if (!state.readEmails.includes(emailId)) {
                state.readEmails.push(emailId);
            }
        },
        selectedEmail: (state, action) => {
            state.selectedEmail = action.payload;
        },
        toggleFilter: (state, action) => {
            // This reducer is responsible for toggling the filter options in your state.
            const filterName = action.payload;
            state.filters[filterName] = !state.filters[filterName];
        },
        applyFilters: (state) => {
            state.filteredEmails = state.emails.filter((email) => {
                const emailId = email.id;
                const isRead = state.readEmails.includes(emailId);
                const isFavorite = state.favorites.includes(emailId);

                const filterRead = state.filters.read ? isRead : true;
                const filterUnread = state.filters.unread ? !isRead : true;
                const filterFavorites = state.filters.favorites ? isFavorite : true;

                return filterRead && filterUnread && filterFavorites;
            })
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmails.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchEmails.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.emails = action.payload.list;
            })
            .addCase(fetchEmails.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.error.message;
            })
            .addCase(fetchEmailBody.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchEmailBody.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.emailBody = action.payload;
            })
            .addCase(fetchEmailBody.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.error.message;
            });
    },
});

export const { addFavorite, removeFavorite, markAsRead, selectedEmail,applyFilters } = emailSlice.actions;

export default emailSlice.reducer;
