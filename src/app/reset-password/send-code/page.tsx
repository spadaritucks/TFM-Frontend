import SendCodeForm from "@/components/forms/send-code-form/component";
import Image from "next/image";
import Logo from '../../../../public/logo-tfm.png'
import Logo2 from '../../../../public/tfm-logo-2.png'
import "./styles.css"

export default async function SendCodePage() {
  return (
    <section className="send-code-form-section">
      <div className="send-code-form-image-container">
        <Image src={Logo} alt="" width={400} height={400} />
      </div>
      <div className="send-code-form-container">
        <div className="send-code-form-header">
          <Image src={Logo2} alt="" width={307.2} />
          <p>Gestão Financeira | Praticidade | Metas | Dashboard</p>
        </div>
        <h2>Recuperar Senha</h2>
        <p>Digite seu email para receber o código de recuperação</p>
        <SendCodeForm />
      </div>
    </section>
  );
}
