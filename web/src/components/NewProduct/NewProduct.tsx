import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { getConstantValue } from "typescript";
import "./styles.css";

interface Categoria {
  categoriaId: string;
  nome: string;
}

export function NewProduct() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

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
        categoriaId: Number(data.category),
      });

      console.log("jasndjasndjas");
      alert("Produto cadastrado no banco de dados.");
      console.log(data.productName, data.amount, data.category);
    } catch (err) {
      alert("Erro ao cadastrar produto");
    }
  }

  useEffect(() => {
    axios.get("http://localhost:3333/categorias").then((response) => {
      setCategorias(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div>
      <form onSubmit={handleCreateProduct}>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="productName">Nome do produto:</label>
            <input
              required
              name="productName"
              id="productName"
              type="text"
              placeholder="Ex: Camiseta Regata"
            />
          </div>
          <div className="form-field">
            <label htmlFor="category">Categoria:</label>
            <select
              required
              id="category"
              name="category"
              defaultValue=""
              placeholder="Selecione a categoria"
            >
              <option disabled value="">
                Selecione a categoria
              </option>

              {categorias.map((categoria) => {
                return (
                  <option
                    key={categoria.categoriaId}
                    value={categoria.categoriaId}
                  >
                    {categoria.nome}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="amount">Quantidade:</label>
          <input required name="amount" type="number" placeholder="Ex: 5" />
        </div>

        <div className="form-field">
          <label htmlFor="size">Tamanho:</label>
          <select
            required
            id="size"
            name="size"
            defaultValue=""
            placeholder="Selecione o tamanho"
          >
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
