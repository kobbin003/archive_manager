"use client";
import Image from "next/image";
import Uploader from "../components/uploader/page";
import { ReactNode, useEffect, useState } from "react";
export default function Home() {
	useEffect(() => {
		window.location.href = "/app";
	}, []);

	return (
		<main className="bg-slate-700 h-screen w-screen">
			<h2>Loading...</h2>
		</main>
	);
}
