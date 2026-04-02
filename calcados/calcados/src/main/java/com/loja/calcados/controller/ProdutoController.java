package com.loja.calcados.controller;

import com.loja.calcados.model.Produto;
import com.loja.calcados.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoRepository repository;

    @GetMapping
    public List<Produto> listarTodos() {
        return repository.findAll();
    }

    @PostMapping
    public Produto cadastrarProduto(@RequestBody Produto novoProduto) {
        return repository.save(novoProduto);
    }

    @DeleteMapping("/{id}")
    public void deletarProduto(@PathVariable Long id) {
        repository.deleteById(id);
    }
}