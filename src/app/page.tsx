import LoginForm from "@/components/forms/login-form/component";
import './styles.css'
import Image from "next/image";
import Logo from '../../public/logo-tfm.png'
import Logo2 from '../../public/tfm-logo-2.png'

export default async function Home() {
  return (
    <section className="login-form-section">
      <div className="login-form-image-container">
        <Image src={Logo} alt="" width={400} height={400} />
      </div>
      <div className="login-form-container">
        <div className="login-form-header">
          <Image src={Logo2} alt="" width={307.2} />
          <p>Gestão Financeira | Praticidade | Metas | Dashboard</p>
        </div>
        <h2>Login do Usuario</h2>
        <LoginForm />
      </div>
    </section>
  );
}
