export const toggleStatus = (currStatus) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        if (currStatus === false) {
            firestore.collection('status').add({
                value: true,
                createdAt: new Date()
            })
                .then((res) => {
                    dispatch({ type: 'STATUS_ON' })
                })
                .catch((err) => {
                    dispatch({ type: 'STATUS_ERROR', err })
                })
        } else {
            firestore.collection('status').add({
                value: false,
                createdAt: new Date()
            })
                .then((res) => {
                    dispatch({ type: 'STATUS_OFF' })
                })
                .catch((err) => {
                    dispatch({ type: 'STATUS_ERROR', err })
                })
        }
    }
}


export const toggleMode = (currMode) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        if (currMode === 'manual') {
            firestore.collection('mode').add({
                value: 'auto',
                createdAt: new Date()
            })
        } else {
            firestore.collection('status').add({
                value: 'manual',
                createdAt: new Date()
            })
        }
    }
}
