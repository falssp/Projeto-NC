Attribute VB_Name = "MotorTaxonomiaGenerico"
Option Explicit

'==============================================================
' MOTOR GENERICO DE MONTAGEM DE STRING DE TAXONOMIA
'
' Objetivo: eliminar a necessidade de criar/editar formulas
' hardcoded no ADP toda vez que surge um produto novo com
' regra de montagem propria (Masthead CPH, Branded Mission,
' Mercado Livre, Branded Buzz, etc).
'
' Como usar:
' 1. Rode SetupConfigProdutos() uma vez para criar a aba
'    "Config_Produtos" ja populada com os 3 produtos mapeados.
' 2. Em qualquer celula do ADP, chame:
'    =MontarStringTaxonomia("Masthead CPH"; LIN(); "Youtube")
'    passando o nome do produto (igual ao da coluna Produto
'    em Config_Produtos), o numero da linha de dados e o nome
'    da aba onde estao os dados fonte.
' 3. Produto novo = adicionar uma linha em Config_Produtos.
'    Nao mexe em formula nenhuma.
'==============================================================


' ---------- FUNCAO PRINCIPAL (chamavel como formula) ----------
Function MontarStringTaxonomia(produto As String, linha As Long, aba As String) As String

    Dim wsConfig As Worksheet, wsDados As Worksheet
    Dim linhaConfig As Long

    On Error GoTo TrataErro

    Set wsConfig = ThisWorkbook.Sheets("Config_Produtos")
    Set wsDados = ThisWorkbook.Sheets(aba)

    linhaConfig = LocalizarProduto(wsConfig, produto)
    If linhaConfig = 0 Then
        MontarStringTaxonomia = "Produto '" & produto & "' nao configurado em Config_Produtos"
        Exit Function
    End If

    Dim colunaTrigger As String, valorTrigger As String
    Dim colunasFonte As String, delimitador As String
    Dim transformacao As String, minCharsTxt As String
    Dim msgErro As String

    colunaTrigger = Trim(wsConfig.Cells(linhaConfig, ColConfig("Coluna Trigger")).Value)
    valorTrigger = Trim(wsConfig.Cells(linhaConfig, ColConfig("Valor Trigger")).Value)
    colunasFonte = Trim(wsConfig.Cells(linhaConfig, ColConfig("Colunas Fonte")).Value)
    delimitador = wsConfig.Cells(linhaConfig, ColConfig("Delimitador")).Value
    transformacao = LCase(Trim(wsConfig.Cells(linhaConfig, ColConfig("Transformacao")).Value))
    minCharsTxt = Trim(wsConfig.Cells(linhaConfig, ColConfig("Min Chars")).Value)
    msgErro = wsConfig.Cells(linhaConfig, ColConfig("Msg Erro")).Value

    ' -- valida o(s) trigger(s). Aceita multiplos triggers
    '    separados por " + " na mesma celula, ex:
    '    "D=Masthead/Reserva + AJ=YouTube-Masthead-CPH"
    If Not ValidaTriggers(wsDados, linha, colunaTrigger, valorTrigger) Then
        MontarStringTaxonomia = msgErro
        Exit Function
    End If

    ' -- concatena as colunas fonte
    Dim partes() As String, resultado As String
    Dim i As Integer, colIdx As Long, valorParte As String

    partes = Split(colunasFonte, ",")
    resultado = ""

    For i = LBound(partes) To UBound(partes)
        colIdx = ColLetraParaNumero(Trim(partes(i)))
        valorParte = CStr(wsDados.Cells(linha, colIdx).Value)
        resultado = resultado & valorParte
        If i < UBound(partes) And delimitador <> "" Then
            resultado = resultado & delimitador
        End If
    Next i

    ' -- aplica transformacao de texto
    Select Case transformacao
        Case "lower"
            resultado = LCase(resultado)
        Case "upper"
            resultado = UCase(resultado)
        Case "proper"
            resultado = Application.WorksheetFunction.Proper(resultado)
        Case Else
            ' sem transformacao
    End Select

    ' -- valida tamanho minimo, se configurado
    If minCharsTxt <> "" Then
        If Len(resultado) < CLng(minCharsTxt) Then
            MontarStringTaxonomia = msgErro
            Exit Function
        End If
    End If

    MontarStringTaxonomia = resultado
    Exit Function

TrataErro:
    MontarStringTaxonomia = "Erro ao montar string: " & Err.Description
End Function


' ---------- VALIDA TRIGGER(S) ----------
' Suporta um unico trigger simples (coluna="valor") ou
' multiplos triggers combinados com " + " (todos precisam bater).
Private Function ValidaTriggers(wsDados As Worksheet, linha As Long, _
                                 colunaTrigger As String, valorTrigger As String) As Boolean

    Dim triggersCol() As String, triggersVal() As String
    Dim i As Integer
    Dim colIdx As Long

    ' formato esperado quando ha 1 trigger: colunaTrigger = "D", valorTrigger = "Masthead/Reserva"
    ' formato esperado quando ha 2+: colunaTrigger = "D,AJ", valorTrigger = "Masthead/Reserva,YouTube-Masthead-CPH"
    triggersCol = Split(colunaTrigger, ",")
    triggersVal = Split(valorTrigger, ",")

    If UBound(triggersCol) <> UBound(triggersVal) Then
        ValidaTriggers = False
        Exit Function
    End If

    For i = LBound(triggersCol) To UBound(triggersCol)
        colIdx = ColLetraParaNumero(Trim(triggersCol(i)))
        If Trim(CStr(wsDados.Cells(linha, colIdx).Value)) <> Trim(triggersVal(i)) Then
            ValidaTriggers = False
            Exit Function
        End If
    Next i

    ValidaTriggers = True
End Function


' ---------- LOCALIZA A LINHA DO PRODUTO EM Config_Produtos ----------
Private Function LocalizarProduto(wsConfig As Worksheet, produto As String) As Long
    Dim ultimaLinha As Long, i As Long

    ultimaLinha = wsConfig.Cells(wsConfig.Rows.Count, 1).End(xlUp).Row

    For i = 2 To ultimaLinha ' linha 1 = cabecalho
        If Trim(wsConfig.Cells(i, 1).Value) = Trim(produto) Then
            LocalizarProduto = i
            Exit Function
        End If
    Next i

    LocalizarProduto = 0 ' nao encontrado
End Function


' ---------- CONVERTE LETRA DE COLUNA (ex "EH") EM NUMERO ----------
Private Function ColLetraParaNumero(letra As String) As Long
    ColLetraParaNumero = Range(letra & "1").Column
End Function


' ---------- RETORNA O NUMERO DA COLUNA EM Config_Produtos PELO NOME DO CABECALHO ----------
Private Function ColConfig(nomeColuna As String) As Long
    Dim ws As Worksheet
    Dim c As Long, ultimaCol As Long

    Set ws = ThisWorkbook.Sheets("Config_Produtos")
    ultimaCol = ws.Cells(1, ws.Columns.Count).End(xlToLeft).Column

    For c = 1 To ultimaCol
        If Trim(ws.Cells(1, c).Value) = nomeColuna Then
            ColConfig = c
            Exit Function
        End If
    Next c

    ColConfig = 0
End Function


' ---------- CRIA E POPULA A ABA Config_Produtos ----------
' Rode uma unica vez (ou de novo se quiser resetar a config).
Sub SetupConfigProdutos()
    Dim ws As Worksheet

    On Error Resume Next
    Set ws = ThisWorkbook.Sheets("Config_Produtos")
    On Error GoTo 0

    If ws Is Nothing Then
        Set ws = ThisWorkbook.Sheets.Add(After:=ThisWorkbook.Sheets(ThisWorkbook.Sheets.Count))
        ws.Name = "Config_Produtos"
    Else
        ws.Cells.Clear
    End If

    ' cabecalho
    Dim cabecalhos As Variant
    cabecalhos = Array("Produto", "Plataforma", "Coluna Trigger", "Valor Trigger", _
                        "Colunas Fonte", "Delimitador", "Transformacao", "Min Chars", "Msg Erro")

    Dim i As Integer
    For i = 0 To UBound(cabecalhos)
        ws.Cells(1, i + 1).Value = cabecalhos(i)
    Next i
    ws.Rows(1).Font.Bold = True

    ' -- linha 2: Masthead CPH (aba Youtube) --
    ws.Cells(2, 1).Value = "Masthead CPH"
    ws.Cells(2, 2).Value = "Youtube"
    ws.Cells(2, 3).Value = "D,AJ"
    ws.Cells(2, 4).Value = "Masthead/Reserva,YouTube-Masthead-CPH"
    ws.Cells(2, 5).Value = "EH,EI"
    ws.Cells(2, 6).Value = ""
    ws.Cells(2, 7).Value = "lower"
    ws.Cells(2, 8).Value = "120"
    ws.Cells(2, 9).Value = "IO menor que 120 caracteres"

    ' -- linha 3: Branded Mission (aba Meta e Tiktok) --
    ws.Cells(3, 1).Value = "Branded Mission"
    ws.Cells(3, 2).Value = "Tiktok"
    ws.Cells(3, 3).Value = "D,AP"
    ws.Cells(3, 4).Value = "Tiktok,Branded-Mission"
    ws.Cells(3, 5).Value = "ED,EE"
    ws.Cells(3, 6).Value = ""
    ws.Cells(3, 7).Value = "lower"
    ws.Cells(3, 8).Value = ""
    ws.Cells(3, 9).Value = "nao e branded-mission"

    ' -- linha 4: Mercado Livre (aba Programmatic) --
    ws.Cells(4, 1).Value = "Mercado Livre"
    ws.Cells(4, 2).Value = "Programmatic"
    ws.Cells(4, 3).Value = "AJ"
    ws.Cells(4, 4).Value = "Mercado Livre"
    ws.Cells(4, 5).Value = "EQ,ER"
    ws.Cells(4, 6).Value = ""
    ws.Cells(4, 7).Value = "lower"
    ws.Cells(4, 8).Value = ""
    ws.Cells(4, 9).Value = "Nao e Mercado Livre"

    ' -- linha 5: Branded Buzz (TEMPLATE - preencher quando a regra estiver definida) --
    ws.Cells(5, 1).Value = "Branded Buzz"
    ws.Cells(5, 2).Value = "Tiktok"
    ws.Cells(5, 3).Value = "PREENCHER"
    ws.Cells(5, 4).Value = "PREENCHER"
    ws.Cells(5, 5).Value = "PREENCHER"
    ws.Cells(5, 6).Value = "PREENCHER"
    ws.Cells(5, 7).Value = "PREENCHER"
    ws.Cells(5, 8).Value = "PREENCHER"
    ws.Cells(5, 9).Value = "nao e branded-buzz"

    ws.Columns("A:I").AutoFit
    ws.Range("A1").Select

    MsgBox "Aba Config_Produtos criada/atualizada com sucesso." & vbCrLf & _
           "Preencha a linha 'Branded Buzz' assim que a regra de montagem for definida.", vbInformation
End Sub
