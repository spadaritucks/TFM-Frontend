import './styles.css'
import Image from "next/image";
import Logo from '../../../public/logo-tfm.png'
import Logo2 from '../../../public/tfm-logo-2.png'
import RegisterForm from "@/components/forms/register-user-form/component";

export default async function Register() {
  return (
    <section className="register-form-section">
      <div className="register-form-image-container">
        <Image src={Logo} alt="" width={400} height={400} />
      </div>
      <div className="register-form-container">
        <div className="register-form-header">
          <Image src={Logo2} alt="" width={307.2} />
          <p>Gestão Financeira | Praticidade | Metas | Dashboard</p>
        </div>
        <h2>Registre-se gratuitamente</h2>
        <RegisterForm />
      </div>
    </section>
  );
}
