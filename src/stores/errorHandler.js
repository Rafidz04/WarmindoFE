import Swal from 'sweetalert2'
export function errorHandler (err)  {
    // console.log(err, "<<<")
    
    if(err.response && err.response.status === 403){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message
        }).then(() => {
            localStorage.removeItem('tokenjid')
            window.location.replace('/auth/login-page');
        })
    }else if(err.response) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message
        })
    }else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Periksa koneksi internet anda!"
        })
    }
}