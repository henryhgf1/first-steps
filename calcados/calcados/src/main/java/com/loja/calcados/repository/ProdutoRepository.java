package com.loja.calcados.repository;

import com.loja.calcados.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

// Dizemos ao Spring: "Tome conta da classe Produto, e o ID dela é do tipo Long"
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    // Apenas deixando o arquivo assim, vazio por dentro, o Spring Boot já cria invisivelmente:
    // repository.save() -> Salva no banco
    // repository.findAll() -> Lista todos
    // repository.findById() -> Busca um específico
    // repository.deleteById() -> Deleta
}