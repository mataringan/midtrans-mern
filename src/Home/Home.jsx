import React, { useEffect, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import axios from "axios";

const Home = () => {
    const [name, setName] = useState("");
    const [order_id, setOrder_id] = useState("");
    const [total, setTotal] = useState(0);

    const [token, setToken] = useState("");

    localStorage.setItem("token", token);

    const process = async () => {
        const data = {
            name,
            order_id,
            total,
        };
        // console.log(data);

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await axios.post(
            "http://localhost:9000/process-transaction",
            data,
            config
        );

        setToken(response.data.token);
    };

    useEffect(() => {
        if (token) {
            window.snap.pay(token, {
                onSuccess: (result) => {
                    localStorage.setItem(
                        "Pembayaran anda Success",
                        JSON.stringify(result)
                    );
                    // setToken("");
                    alert("Success");
                },
                onPending: (result) => {
                    localStorage.setItem(
                        "Pembayaran anda Pending",
                        JSON.stringify(result)
                    );
                    // setToken("");
                    alert("Pending");
                },
                onError: (error) => {
                    console.log(error);
                    // setToken("");
                    alert("Error");
                },
                onClose: () => {
                    console.log("Anda Belum Menyelesaikan Pembayaran");
                    // setToken("");
                    alert("Close");
                },
            });

            setName("");
            setOrder_id("");
            setTotal("");
        }
    }, [token]);

    useEffect(() => {
        const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransUrl;

        const midtransClientKey = import.meta.env.clientKey;
        scriptTag.setAttribute("data-client-key", midtransClientKey);

        document.body.appendChild(scriptTag);

        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);

    const tokenPay = localStorage.getItem("token");

    function showHandler() {
        window.snap.pay(tokenPay, {
            onSuccess: () => {
                localStorage.setItem("token", "");
                // setToken("");
                alert("Success Pembayaran");
            },
        });
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                width: "50vw",
                p: 4,
            }}
        >
            <TextField
                label="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                label="Order Id"
                type="text"
                value={order_id}
                onChange={(e) => setOrder_id(e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                label="Total"
                type="number"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Box>
                <Button onClick={process} variant="outlined">
                    Proses
                </Button>
            </Box>
            <Box>
                <Button onClick={showHandler} variant="outlined">
                    Proses
                </Button>
            </Box>
        </Box>
    );
};

export default Home;
