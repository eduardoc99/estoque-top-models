import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getConstantValue } from "typescript";
import "./styles.css";

interface Categoria {
  categoriaId: string;
  nome: string;
}

export function NewProduct() {
  async function handleCreateProduct(event: FormEvent) {
    event.preventDefault();
    console.log("clicou no botão");

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    console.log(data);

    // Enviar arquivo para o BD
    try {
      await axios.post("http://localhost:3333/produto", {
        nome: data.productName,
        qtd: Number(data.amount),
        tamanho: data.size,
        categoriaName: data.category,
      });

      console.log("jasndjasndjas");
      Swal.fire({
        icon: "success",
        title: "Boaa",
        text: "Seu produto foi cadastrado :)",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocorreu um erro ao cadastrar o seu produto :(",
        footer: '<a href="/contato">Entre em contato com os dev</a>',
        
      });
    }
  }

  return (
    <div>
      <form onSubmit={handleCreateProduct}>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="productName">Nome do produto:</label>
            <input required name="productName" id="productName" type="text" />
          </div>
          <div className="form-field">
            <label htmlFor="category">Categoria:</label>
            <select required id="category" name="category" defaultValue="">
              <option disabled value="">
                Selecione a categoria
              </option>

              <option value="Camisetas">Camisetas</option>
              <option value="Blusinhas">Blusinhas</option>
              <option value="Camisas">Camisas</option>
              <option value="Sueteres e cardigans">Suéteres e Cardigans</option>
              <option value="Blazers, jaquetas e casacos">
                Blazers, jaquetas e casacos
              </option>
              <option value="Coletes e quimonos">Coletes e quimonos</option>
              <option value="Regatas">Regatas</option>
              <option value="Shorts e bermudas">Shorts e bermudas</option>
              <option value="Calças">Calças</option>
              <option value="Vestidos">Vestidos</option>
              <option value="Saias">Saias</option>
              <option value="Meias-calças">Meias-calças</option>
              <option value="Cachecóis e pashminas">
                Cachecóis e pashminas
              </option>
              <option value="Lenços">Lenços</option>
              <option value="Bolsas">Sapatos</option>
              <option value="Meias">Meias</option>
              <option value="Outros">Outros</option>
            </select>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="amount">Quantidade:</label>
          <input required name="amount" type="number" />
        </div>

        <div className="form-field">
          <label htmlFor="size">Tamanho:</label>
          <select required id="size" name="size" defaultValue="">
            <option disabled value="">
              Selecione o tamanho
            </option>

            <option value="PP">PP</option>
            <option value="P">P</option>
            <option value="M">M</option>
            <option value="G">G</option>
            <option value="G">GG</option>
          </select>
        </div>

        <div className="form-button">
          <span>Clique para finalizar o cadastro do produto</span>
          <button type="submit">Cadastrar Produto</button>
        </div>
      </form>
    </div>
  );
}
