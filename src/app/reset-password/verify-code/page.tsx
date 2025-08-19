import VerifyCodeForm from "@/components/forms/verify-code-form/component";
import Image from "next/image";
import Logo from '../../../../public/logo-tfm.png'
import Logo2 from '../../../../public/tfm-logo-2.png'
import "./styles.css"

export default async function VerifyCodePage() {
  return (
    <section className="verify-code-form-section">
      <div className="verify-code-form-image-container">
        <Image src={Logo} alt="" width={400} height={400} />
      </div>
      <div className="verify-code-form-container">
        <div className="verify-code-form-header">
          <Image src={Logo2} alt="" width={307.2} />
          <p>Gestão Financeira | Praticidade | Metas | Dashboard</p>
        </div>
        <h2>Verificar Código</h2>
        <p>Digite o código de 6 dígitos enviado para seu email</p>
        <VerifyCodeForm />
      </div>
    </section>
  );
}
