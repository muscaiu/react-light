export const toggleStatus = (status) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        if (status === false) {
            firestore.collection('status').add({
                status: true,
                createdAt: new Date()
            }).then((res) => {
                dispatch({ type: 'STATUS_ON' })
            }).catch((err) => {
                dispatch({ type: 'STATUS_ERROR', err })
            })
        } else {
            firestore.collection('status').add({
                status: false,
                createdAt: new Date()
            }).then((res) => {
                dispatch({ type: 'STATUS_OFF' })
            }).catch((err) => {
                dispatch({ type: 'STATUS_ERROR', err })
            })
        }
    }
}
