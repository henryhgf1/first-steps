package com.loja.calcados.controller;

import com.loja.calcados.model.Produto;
import com.loja.calcados.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
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

    @PutMapping("/{id}")
    public Produto atualizarProduto(@PathVariable Long id, @RequestBody Produto dadosAtualizados) {
        Produto produto = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        if (dadosAtualizados.getNome() != null) produto.setNome(dadosAtualizados.getNome());
        if (dadosAtualizados.getDescricao() != null) produto.setDescricao(dadosAtualizados.getDescricao());
        if (dadosAtualizados.getPreco() != null) produto.setPreco(dadosAtualizados.getPreco());
        if (dadosAtualizados.getImagemUrl() != null) produto.setImagemUrl(dadosAtualizados.getImagemUrl());
        if (dadosAtualizados.getCategoriaFaixaEtaria() != null) produto.setCategoriaFaixaEtaria(dadosAtualizados.getCategoriaFaixaEtaria());
        if (dadosAtualizados.getEstilo() != null) produto.setEstilo(dadosAtualizados.getEstilo());
        return repository.save(produto);
    }

    @GetMapping(params = "estilo")
    public List<Produto> filtrarPorEstilo(@RequestParam String estilo) {
        return repository.findAll().stream()
                .filter(p -> estilo.equalsIgnoreCase(p.getEstilo()))
                .toList();
    }
}
