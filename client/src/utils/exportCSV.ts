import API from "../api/axios";

const exportCSV = async () => {
    try {
        const token =
            localStorage.getItem("token");

        const response = await API.get(
            "/leads/export/csv",
            {
                responseType: "blob",

                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const url =
            window.URL.createObjectURL(
                new Blob([response.data])
            );

        const link =
            document.createElement("a");

        link.href = url;

        link.setAttribute(
            "download",
            "leads.csv"
        );

        document.body.appendChild(link);

        link.click();

        link.remove();
    } 
    catch (error) {
        console.error(
            "CSV export failed"
        );
    }
};

export default exportCSV;
