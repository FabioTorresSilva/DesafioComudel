import { useEffect, useState } from "react";
import { z } from "zod";
import { useRouter } from "next/router";
import Pdf from "@/components/Pdf";

// ZOD SCHEMA, verificacao por parte do front-end


export default function Historico() {
 

  return (
    <main className={`min-h-screen bg-blue-100 justify-center flex `}>
      <Pdf/>
    </main>
  );
}
