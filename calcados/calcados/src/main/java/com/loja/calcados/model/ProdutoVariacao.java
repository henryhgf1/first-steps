package com.loja.calcados.model;

import jakarta.persistence.*;

@Entity // 1. MÁGICA: Avisa que isso vai virar uma tabela no banco
@Table(name = "produto_variacoes")
public class ProdutoVariacao {

    @Id // 2. MÁGICA: Diz que o ID é a chave primária
    @GeneratedValue(strategy = GenerationType.IDENTITY) // O banco gera o ID sozinho
    private Long id;

    private String cor;
    private int tamanho; // Ex: 18, 19, 20...
    private double preco;
    private int quantidadeEstoque;

    // CONSTRUTOR VAZIO: Obrigatório para o banco de dados funcionar nos bastidores
    public ProdutoVariacao() {
    }

    // CONSTRUTOR COM DADOS: O que nós vamos usar no código (Repare que não tem mais o ID aqui)
    public ProdutoVariacao(String cor, int tamanho, double preco, int quantidadeEstoque) {
        this.cor = cor;
        this.tamanho = tamanho;
        this.preco = preco;
        this.quantidadeEstoque = quantidadeEstoque;
    }

    // Método de negócio: Verifica se tem em estoque
    public boolean isDisponivel() {
        return this.quantidadeEstoque > 0;
    }

    // Método de negócio: Reduzir estoque após uma compra
    public void baixarEstoque(int quantidadeComprada) {
        if (quantidadeComprada <= this.quantidadeEstoque) {
            this.quantidadeEstoque -= quantidadeComprada;
        } else {
            throw new IllegalArgumentException("Estoque insuficiente para esta numeração.");
        }
    }

    // Getters: Necessários para o Spring Boot conseguir ler os dados
    public Long getId() { return id; }
    public int getTamanho() { return tamanho; }
    public String getCor() { return cor; }
    public double getPreco() { return preco; }
    public int getQuantidadeEstoque() { return quantidadeEstoque; }
}