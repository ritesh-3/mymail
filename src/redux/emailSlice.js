import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    emails: [],
    isLoading: false,
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
    filteredEmails: [],
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

                return filterRead && filterFavorites && filterUnread;
            })
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchEmails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.emails = action.payload.list;
            })
            .addCase(fetchEmails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchEmailBody.pending, (state) => {
                state.isLoading = true;
                state.emailBody = null;
            })
            .addCase(fetchEmailBody.fulfilled, (state, action) => {
                state.isLoading = false;
                state.emailBody = action.payload;
            })
            .addCase(fetchEmailBody.rejected, (state, action) => {
                state.isLoading = false;
                state.emailBody = null;
                state.error = action.error.message;
            });
    },
});

export const { addFavorite, removeFavorite, markAsRead, selectedEmail, applyFilters, toggleFilter } = emailSlice.actions;

export default emailSlice.reducer;
