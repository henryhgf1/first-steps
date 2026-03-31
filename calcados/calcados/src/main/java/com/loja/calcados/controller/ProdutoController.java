package com.loja.calcados.controller;

import com.loja.calcados.model.Produto;
import com.loja.calcados.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*")
@RestController // Avisa que esta classe é uma API REST
@RequestMapping("/api/produtos") // O endereço de internet para acessar os produtos
public class ProdutoController {

    // INJEÇÃO DE DEPENDÊNCIA: Pede para o Spring trazer o Repository pronto para uso
    @Autowired
    private ProdutoRepository repository;

    // ROTA 1: BUSCAR TODOS OS PRODUTOS (Caminho da prateleira)
    @GetMapping
    public List<Produto> listarTodos() {
        return repository.findAll(); // Vai no banco, pega tudo e devolve!
    }

    // ROTA 2: CADASTRAR UM PRODUTO NOVO (Caminho do estoque)
    @PostMapping
    public Produto cadastrarProduto(@RequestBody Produto novoProduto) {
        // O @RequestBody pega o JSON que vem da internet e transforma na classe Produto
        return repository.save(novoProduto); // Salva no banco de dados
    }
    // O {id} é o número do produto que queremos apagar
    @DeleteMapping("/{id}")
    public void deletarProduto(@PathVariable Long id) {
        repository.deleteById(id);
    }
}