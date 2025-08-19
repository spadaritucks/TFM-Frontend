import NewPasswordForm from "@/components/forms/new-password-form/component";
import Image from "next/image";
import Logo from '../../../../public/logo-tfm.png'
import Logo2 from '../../../../public/tfm-logo-2.png'
import "./styles.css"

export default async function NewPasswordPage() {
  return (
    <section className="new-password-form-section">
      <div className="new-password-form-image-container">
        <Image src={Logo} alt="" width={400} height={400} />
      </div>
      <div className="new-password-form-container">
        <div className="new-password-form-header">
          <Image src={Logo2} alt="" width={307.2} />
          <p>Gestão Financeira | Praticidade | Metas | Dashboard</p>
        </div>
        <h2>Nova Senha</h2>
        <p>Digite sua nova senha</p>
        <NewPasswordForm />
      </div>
    </section>
  );
}
