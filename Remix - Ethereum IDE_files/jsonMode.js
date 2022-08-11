define('vs/language/json/workerManager',["require","exports","./fillers/monaco-editor-core"],function(require,exports,monaco_editor_core_1){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.WorkerManager=void 0;var STOP_WHEN_IDLE_FOR=2*60*1000;var WorkerManager=(function(){function WorkerManager(defaults){var _this=this;this._defaults=defaults;this._worker=null;this._idleCheckInterval=window.setInterval(function(){return _this._checkIfIdle();},30*1000);this._lastUsedTime=0;this._configChangeListener=this._defaults.onDidChange(function(){return _this._stopWorker();});}
WorkerManager.prototype._stopWorker=function(){if(this._worker){this._worker.dispose();this._worker=null;}
this._client=null;};WorkerManager.prototype.dispose=function(){clearInterval(this._idleCheckInterval);this._configChangeListener.dispose();this._stopWorker();};WorkerManager.prototype._checkIfIdle=function(){if(!this._worker){return;}
var timePassedSinceLastUsed=Date.now()-this._lastUsedTime;if(timePassedSinceLastUsed>STOP_WHEN_IDLE_FOR){this._stopWorker();}};WorkerManager.prototype._getClient=function(){this._lastUsedTime=Date.now();if(!this._client){this._worker=monaco_editor_core_1.editor.createWebWorker({moduleId:'vs/language/json/jsonWorker',label:this._defaults.languageId,createData:{languageSettings:this._defaults.diagnosticsOptions,languageId:this._defaults.languageId,enableSchemaRequest:this._defaults.diagnosticsOptions.enableSchemaRequest}});this._client=this._worker.getProxy();}
return this._client;};WorkerManager.prototype.getLanguageServiceWorker=function(){var _this=this;var resources=[];for(var _i=0;_i<arguments.length;_i++){resources[_i]=arguments[_i];}
var _client;return this._getClient().then(function(client){_client=client;}).then(function(_){return _this._worker.withSyncedResources(resources);}).then(function(_){return _client;});};return WorkerManager;}());exports.WorkerManager=WorkerManager;});(function(factory){if(typeof module==="object"&&typeof module.exports==="object"){var v=factory(require,exports);if(v!==undefined)module.exports=v;}
else if(typeof define==="function"&&define.amd){define('vscode-languageserver-types/main',["require","exports"],factory);}})(function(require,exports){'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.TextDocument=exports.EOL=exports.SelectionRange=exports.DocumentLink=exports.FormattingOptions=exports.CodeLens=exports.CodeAction=exports.CodeActionContext=exports.CodeActionKind=exports.DocumentSymbol=exports.SymbolInformation=exports.SymbolTag=exports.SymbolKind=exports.DocumentHighlight=exports.DocumentHighlightKind=exports.SignatureInformation=exports.ParameterInformation=exports.Hover=exports.MarkedString=exports.CompletionList=exports.CompletionItem=exports.InsertTextMode=exports.InsertReplaceEdit=exports.CompletionItemTag=exports.InsertTextFormat=exports.CompletionItemKind=exports.MarkupContent=exports.MarkupKind=exports.TextDocumentItem=exports.OptionalVersionedTextDocumentIdentifier=exports.VersionedTextDocumentIdentifier=exports.TextDocumentIdentifier=exports.WorkspaceChange=exports.WorkspaceEdit=exports.DeleteFile=exports.RenameFile=exports.CreateFile=exports.TextDocumentEdit=exports.AnnotatedTextEdit=exports.ChangeAnnotationIdentifier=exports.ChangeAnnotation=exports.TextEdit=exports.Command=exports.Diagnostic=exports.CodeDescription=exports.DiagnosticTag=exports.DiagnosticSeverity=exports.DiagnosticRelatedInformation=exports.FoldingRange=exports.FoldingRangeKind=exports.ColorPresentation=exports.ColorInformation=exports.Color=exports.LocationLink=exports.Location=exports.Range=exports.Position=exports.uinteger=exports.integer=void 0;var integer;(function(integer){integer.MIN_VALUE=-2147483648;integer.MAX_VALUE=2147483647;})(integer=exports.integer||(exports.integer={}));var uinteger;(function(uinteger){uinteger.MIN_VALUE=0;uinteger.MAX_VALUE=2147483647;})(uinteger=exports.uinteger||(exports.uinteger={}));var Position;(function(Position){function create(line,character){if(line===Number.MAX_VALUE){line=uinteger.MAX_VALUE;}
if(character===Number.MAX_VALUE){character=uinteger.MAX_VALUE;}
return{line:line,character:character};}
Position.create=create;function is(value){var candidate=value;return Is.objectLiteral(candidate)&&Is.uinteger(candidate.line)&&Is.uinteger(candidate.character);}
Position.is=is;})(Position=exports.Position||(exports.Position={}));var Range;(function(Range){function create(one,two,three,four){if(Is.uinteger(one)&&Is.uinteger(two)&&Is.uinteger(three)&&Is.uinteger(four)){return{start:Position.create(one,two),end:Position.create(three,four)};}
else if(Position.is(one)&&Position.is(two)){return{start:one,end:two};}
else{throw new Error("Range#create called with invalid arguments["+one+", "+two+", "+three+", "+four+"]");}}
Range.create=create;function is(value){var candidate=value;return Is.objectLiteral(candidate)&&Position.is(candidate.start)&&Position.is(candidate.end);}
Range.is=is;})(Range=exports.Range||(exports.Range={}));var Location;(function(Location){function create(uri,range){return{uri:uri,range:range};}
Location.create=create;function is(value){var candidate=value;return Is.defined(candidate)&&Range.is(candidate.range)&&(Is.string(candidate.uri)||Is.undefined(candidate.uri));}
Location.is=is;})(Location=exports.Location||(exports.Location={}));var LocationLink;(function(LocationLink){function create(targetUri,targetRange,targetSelectionRange,originSelectionRange){return{targetUri:targetUri,targetRange:targetRange,targetSelectionRange:targetSelectionRange,originSelectionRange:originSelectionRange};}
LocationLink.create=create;function is(value){var candidate=value;return Is.defined(candidate)&&Range.is(candidate.targetRange)&&Is.string(candidate.targetUri)&&(Range.is(candidate.targetSelectionRange)||Is.undefined(candidate.targetSelectionRange))&&(Range.is(candidate.originSelectionRange)||Is.undefined(candidate.originSelectionRange));}
LocationLink.is=is;})(LocationLink=exports.LocationLink||(exports.LocationLink={}));var Color;(function(Color){function create(red,green,blue,alpha){return{red:red,green:green,blue:blue,alpha:alpha,};}
Color.create=create;function is(value){var candidate=value;return Is.numberRange(candidate.red,0,1)&&Is.numberRange(candidate.green,0,1)&&Is.numberRange(candidate.blue,0,1)&&Is.numberRange(candidate.alpha,0,1);}
Color.is=is;})(Color=exports.Color||(exports.Color={}));var ColorInformation;(function(ColorInformation){function create(range,color){return{range:range,color:color,};}
ColorInformation.create=create;function is(value){var candidate=value;return Range.is(candidate.range)&&Color.is(candidate.color);}
ColorInformation.is=is;})(ColorInformation=exports.ColorInformation||(exports.ColorInformation={}));var ColorPresentation;(function(ColorPresentation){function create(label,textEdit,additionalTextEdits){return{label:label,textEdit:textEdit,additionalTextEdits:additionalTextEdits,};}
ColorPresentation.create=create;function is(value){var candidate=value;return Is.string(candidate.label)&&(Is.undefined(candidate.textEdit)||TextEdit.is(candidate))&&(Is.undefined(candidate.additionalTextEdits)||Is.typedArray(candidate.additionalTextEdits,TextEdit.is));}
ColorPresentation.is=is;})(ColorPresentation=exports.ColorPresentation||(exports.ColorPresentation={}));var FoldingRangeKind;(function(FoldingRangeKind){FoldingRangeKind["Comment"]="comment";FoldingRangeKind["Imports"]="imports";FoldingRangeKind["Region"]="region";})(FoldingRangeKind=exports.FoldingRangeKind||(exports.FoldingRangeKind={}));var FoldingRange;(function(FoldingRange){function create(startLine,endLine,startCharacter,endCharacter,kind){var result={startLine:startLine,endLine:endLine};if(Is.defined(startCharacter)){result.startCharacter=startCharacter;}
if(Is.defined(endCharacter)){result.endCharacter=endCharacter;}
if(Is.defined(kind)){result.kind=kind;}
return result;}
FoldingRange.create=create;function is(value){var candidate=value;return Is.uinteger(candidate.startLine)&&Is.uinteger(candidate.startLine)&&(Is.undefined(candidate.startCharacter)||Is.uinteger(candidate.startCharacter))&&(Is.undefined(candidate.endCharacter)||Is.uinteger(candidate.endCharacter))&&(Is.undefined(candidate.kind)||Is.string(candidate.kind));}
FoldingRange.is=is;})(FoldingRange=exports.FoldingRange||(exports.FoldingRange={}));var DiagnosticRelatedInformation;(function(DiagnosticRelatedInformation){function create(location,message){return{location:location,message:message};}
DiagnosticRelatedInformation.create=create;function is(value){var candidate=value;return Is.defined(candidate)&&Location.is(candidate.location)&&Is.string(candidate.message);}
DiagnosticRelatedInformation.is=is;})(DiagnosticRelatedInformation=exports.DiagnosticRelatedInformation||(exports.DiagnosticRelatedInformation={}));var DiagnosticSeverity;(function(DiagnosticSeverity){DiagnosticSeverity.Error=1;DiagnosticSeverity.Warning=2;DiagnosticSeverity.Information=3;DiagnosticSeverity.Hint=4;})(DiagnosticSeverity=exports.DiagnosticSeverity||(exports.DiagnosticSeverity={}));var DiagnosticTag;(function(DiagnosticTag){DiagnosticTag.Unnecessary=1;DiagnosticTag.Deprecated=2;})(DiagnosticTag=exports.DiagnosticTag||(exports.DiagnosticTag={}));var CodeDescription;(function(CodeDescription){function is(value){var candidate=value;return candidate!==undefined&&candidate!==null&&Is.string(candidate.href);}
CodeDescription.is=is;})(CodeDescription=exports.CodeDescription||(exports.CodeDescription={}));var Diagnostic;(function(Diagnostic){function create(range,message,severity,code,source,relatedInformation){var result={range:range,message:message};if(Is.defined(severity)){result.severity=severity;}
if(Is.defined(code)){result.code=code;}
if(Is.defined(source)){result.source=source;}
if(Is.defined(relatedInformation)){result.relatedInformation=relatedInformation;}
return result;}
Diagnostic.create=create;function is(value){var _a;var candidate=value;return Is.defined(candidate)&&Range.is(candidate.range)&&Is.string(candidate.message)&&(Is.number(candidate.severity)||Is.undefined(candidate.severity))&&(Is.integer(candidate.code)||Is.string(candidate.code)||Is.undefined(candidate.code))&&(Is.undefined(candidate.codeDescription)||(Is.string((_a=candidate.codeDescription)===null||_a===void 0?void 0:_a.href)))&&(Is.string(candidate.source)||Is.undefined(candidate.source))&&(Is.undefined(candidate.relatedInformation)||Is.typedArray(candidate.relatedInformation,DiagnosticRelatedInformation.is));}
Diagnostic.is=is;})(Diagnostic=exports.Diagnostic||(exports.Diagnostic={}));var Command;(function(Command){function create(title,command){var args=[];for(var _i=2;_i<arguments.length;_i++){args[_i-2]=arguments[_i];}
var result={title:title,command:command};if(Is.defined(args)&&args.length>0){result.arguments=args;}
return result;}
Command.create=create;function is(value){var candidate=value;return Is.defined(candidate)&&Is.string(candidate.title)&&Is.string(candidate.command);}
Command.is=is;})(Command=exports.Command||(exports.Command={}));var TextEdit;(function(TextEdit){function replace(range,newText){return{range:range,newText:newText};}
TextEdit.replace=replace;function insert(position,newText){return{range:{start:position,end:position},newText:newText};}
TextEdit.insert=insert;function del(range){return{range:range,newText:''};}
TextEdit.del=del;function is(value){var candidate=value;return Is.objectLiteral(candidate)&&Is.string(candidate.newText)&&Range.is(candidate.range);}
TextEdit.is=is;})(TextEdit=exports.TextEdit||(exports.TextEdit={}));var ChangeAnnotation;(function(ChangeAnnotation){function create(label,needsConfirmation,description){var result={label:label};if(needsConfirmation!==undefined){result.needsConfirmation=needsConfirmation;}
if(description!==undefined){result.description=description;}
return result;}
ChangeAnnotation.create=create;function is(value){var candidate=value;return candidate!==undefined&&Is.objectLiteral(candidate)&&Is.string(candidate.label)&&(Is.boolean(candidate.needsConfirmation)||candidate.needsConfirmation===undefined)&&(Is.string(candidate.description)||candidate.description===undefined);}
ChangeAnnotation.is=is;})(ChangeAnnotation=exports.ChangeAnnotation||(exports.ChangeAnnotation={}));var ChangeAnnotationIdentifier;(function(ChangeAnnotationIdentifier){function is(value){var candidate=value;return typeof candidate==='string';}
ChangeAnnotationIdentifier.is=is;})(ChangeAnnotationIdentifier=exports.ChangeAnnotationIdentifier||(exports.ChangeAnnotationIdentifier={}));var AnnotatedTextEdit;(function(AnnotatedTextEdit){function replace(range,newText,annotation){return{range:range,newText:newText,annotationId:annotation};}
AnnotatedTextEdit.replace=replace;function insert(position,newText,annotation){return{range:{start:position,end:position},newText:newText,annotationId:annotation};}
AnnotatedTextEdit.insert=insert;function del(range,annotation){return{range:range,newText:'',annotationId:annotation};}
AnnotatedTextEdit.del=del;function is(value){var candidate=value;return TextEdit.is(candidate)&&(ChangeAnnotation.is(candidate.annotationId)||ChangeAnnotationIdentifier.is(candidate.annotationId));}
AnnotatedTextEdit.is=is;})(AnnotatedTextEdit=exports.AnnotatedTextEdit||(exports.AnnotatedTextEdit={}));var TextDocumentEdit;(function(TextDocumentEdit){function create(textDocument,edits){return{textDocument:textDocument,edits:edits};}
TextDocumentEdit.create=create;function is(value){var candidate=value;return Is.defined(candidate)&&OptionalVersionedTextDocumentIdentifier.is(candidate.textDocument)&&Array.isArray(candidate.edits);}
TextDocumentEdit.is=is;})(TextDocumentEdit=exports.TextDocumentEdit||(exports.TextDocumentEdit={}));var CreateFile;(function(CreateFile){function create(uri,options,annotation){var result={kind:'create',uri:uri};if(options!==undefined&&(options.overwrite!==undefined||options.ignoreIfExists!==undefined)){result.options=options;}
if(annotation!==undefined){result.annotationId=annotation;}
return result;}
CreateFile.create=create;function is(value){var candidate=value;return candidate&&candidate.kind==='create'&&Is.string(candidate.uri)&&(candidate.options===undefined||((candidate.options.overwrite===undefined||Is.boolean(candidate.options.overwrite))&&(candidate.options.ignoreIfExists===undefined||Is.boolean(candidate.options.ignoreIfExists))))&&(candidate.annotationId===undefined||ChangeAnnotationIdentifier.is(candidate.annotationId));}
CreateFile.is=is;})(CreateFile=exports.CreateFile||(exports.CreateFile={}));var RenameFile;(function(RenameFile){function create(oldUri,newUri,options,annotation){var result={kind:'rename',oldUri:oldUri,newUri:newUri};if(options!==undefined&&(options.overwrite!==undefined||options.ignoreIfExists!==undefined)){result.options=options;}
if(annotation!==undefined){result.annotationId=annotation;}
return result;}
RenameFile.create=create;function is(value){var candidate=value;return candidate&&candidate.kind==='rename'&&Is.string(candidate.oldUri)&&Is.string(candidate.newUri)&&(candidate.options===undefined||((candidate.options.overwrite===undefined||Is.boolean(candidate.options.overwrite))&&(candidate.options.ignoreIfExists===undefined||Is.boolean(candidate.options.ignoreIfExists))))&&(candidate.annotationId===undefined||ChangeAnnotationIdentifier.is(candidate.annotationId));}
RenameFile.is=is;})(RenameFile=exports.RenameFile||(exports.RenameFile={}));var DeleteFile;(function(DeleteFile){function create(uri,options,annotation){var result={kind:'delete',uri:uri};if(options!==undefined&&(options.recursive!==undefined||options.ignoreIfNotExists!==undefined)){result.options=options;}
if(annotation!==undefined){result.annotationId=annotation;}
return result;}
DeleteFile.create=create;function is(value){var candidate=value;return candidate&&candidate.kind==='delete'&&Is.string(candidate.uri)&&(candidate.options===undefined||((candidate.options.recursive===undefined||Is.boolean(candidate.options.recursive))&&(candidate.options.ignoreIfNotExists===undefined||Is.boolean(candidate.options.ignoreIfNotExists))))&&(candidate.annotationId===undefined||ChangeAnnotationIdentifier.is(candidate.annotationId));}
DeleteFile.is=is;})(DeleteFile=exports.DeleteFile||(exports.DeleteFile={}));var WorkspaceEdit;(function(WorkspaceEdit){function is(value){var candidate=value;return candidate&&(candidate.changes!==undefined||candidate.documentChanges!==undefined)&&(candidate.documentChanges===undefined||candidate.documentChanges.every(function(change){if(Is.string(change.kind)){return CreateFile.is(change)||RenameFile.is(change)||DeleteFile.is(change);}
else{return TextDocumentEdit.is(change);}}));}
WorkspaceEdit.is=is;})(WorkspaceEdit=exports.WorkspaceEdit||(exports.WorkspaceEdit={}));var TextEditChangeImpl=(function(){function TextEditChangeImpl(edits,changeAnnotations){this.edits=edits;this.changeAnnotations=changeAnnotations;}
TextEditChangeImpl.prototype.insert=function(position,newText,annotation){var edit;var id;if(annotation===undefined){edit=TextEdit.insert(position,newText);}
else if(ChangeAnnotationIdentifier.is(annotation)){id=annotation;edit=AnnotatedTextEdit.insert(position,newText,annotation);}
else{this.assertChangeAnnotations(this.changeAnnotations);id=this.changeAnnotations.manage(annotation);edit=AnnotatedTextEdit.insert(position,newText,id);}
this.edits.push(edit);if(id!==undefined){return id;}};TextEditChangeImpl.prototype.replace=function(range,newText,annotation){var edit;var id;if(annotation===undefined){edit=TextEdit.replace(range,newText);}
else if(ChangeAnnotationIdentifier.is(annotation)){id=annotation;edit=AnnotatedTextEdit.replace(range,newText,annotation);}
else{this.assertChangeAnnotations(this.changeAnnotations);id=this.changeAnnotations.manage(annotation);edit=AnnotatedTextEdit.replace(range,newText,id);}
this.edits.push(edit);if(id!==undefined){return id;}};TextEditChangeImpl.prototype.delete=function(range,annotation){var edit;var id;if(annotation===undefined){edit=TextEdit.del(range);}
else if(ChangeAnnotationIdentifier.is(annotation)){id=annotation;edit=AnnotatedTextEdit.del(range,annotation);}
else{this.assertChangeAnnotations(this.changeAnnotations);id=this.changeAnnotations.manage(annotation);edit=AnnotatedTextEdit.del(range,id);}
this.edits.push(edit);if(id!==undefined){return id;}};TextEditChangeImpl.prototype.add=function(edit){this.edits.push(edit);};TextEditChangeImpl.prototype.all=function(){return this.edits;};TextEditChangeImpl.prototype.clear=function(){this.edits.splice(0,this.edits.length);};TextEditChangeImpl.prototype.assertChangeAnnotations=function(value){if(value===undefined){throw new Error("Text edit change is not configured to manage change annotations.");}};return TextEditChangeImpl;}());var ChangeAnnotations=(function(){function ChangeAnnotations(annotations){this._annotations=annotations===undefined?Object.create(null):annotations;this._counter=0;this._size=0;}
ChangeAnnotations.prototype.all=function(){return this._annotations;};Object.defineProperty(ChangeAnnotations.prototype,"size",{get:function(){return this._size;},enumerable:false,configurable:true});ChangeAnnotations.prototype.manage=function(idOrAnnotation,annotation){var id;if(ChangeAnnotationIdentifier.is(idOrAnnotation)){id=idOrAnnotation;}
else{id=this.nextId();annotation=idOrAnnotation;}
if(this._annotations[id]!==undefined){throw new Error("Id "+id+" is already in use.");}
if(annotation===undefined){throw new Error("No annotation provided for id "+id);}
this._annotations[id]=annotation;this._size++;return id;};ChangeAnnotations.prototype.nextId=function(){this._counter++;return this._counter.toString();};return ChangeAnnotations;}());var WorkspaceChange=(function(){function WorkspaceChange(workspaceEdit){var _this=this;this._textEditChanges=Object.create(null);if(workspaceEdit!==undefined){this._workspaceEdit=workspaceEdit;if(workspaceEdit.documentChanges){this._changeAnnotations=new ChangeAnnotations(workspaceEdit.changeAnnotations);workspaceEdit.changeAnnotations=this._changeAnnotations.all();workspaceEdit.documentChanges.forEach(function(change){if(TextDocumentEdit.is(change)){var textEditChange=new TextEditChangeImpl(change.edits,_this._changeAnnotations);_this._textEditChanges[change.textDocument.uri]=textEditChange;}});}
else if(workspaceEdit.changes){Object.keys(workspaceEdit.changes).forEach(function(key){var textEditChange=new TextEditChangeImpl(workspaceEdit.changes[key]);_this._textEditChanges[key]=textEditChange;});}}
else{this._workspaceEdit={};}}
Object.defineProperty(WorkspaceChange.prototype,"edit",{get:function(){this.initDocumentChanges();if(this._changeAnnotations!==undefined){if(this._changeAnnotations.size===0){this._workspaceEdit.changeAnnotations=undefined;}
else{this._workspaceEdit.changeAnnotations=this._changeAnnotations.all();}}
return this._workspaceEdit;},enumerable:false,configurable:true});WorkspaceChange.prototype.getTextEditChange=function(key){if(OptionalVersionedTextDocumentIdentifier.is(key)){this.initDocumentChanges();if(this._workspaceEdit.documentChanges===undefined){throw new Error('Workspace edit is not configured for document changes.');}
var textDocument={uri:key.uri,version:key.version};var result=this._textEditChanges[textDocument.uri];if(!result){var edits=[];var textDocumentEdit={textDocument:textDocument,edits:edits};this._workspaceEdit.documentChanges.push(textDocumentEdit);result=new TextEditChangeImpl(edits,this._changeAnnotations);this._textEditChanges[textDocument.uri]=result;}
return result;}
else{this.initChanges();if(this._workspaceEdit.changes===undefined){throw new Error('Workspace edit is not configured for normal text edit changes.');}
var result=this._textEditChanges[key];if(!result){var edits=[];this._workspaceEdit.changes[key]=edits;result=new TextEditChangeImpl(edits);this._textEditChanges[key]=result;}
return result;}};WorkspaceChange.prototype.initDocumentChanges=function(){if(this._workspaceEdit.documentChanges===undefined&&this._workspaceEdit.changes===undefined){this._changeAnnotations=new ChangeAnnotations();this._workspaceEdit.documentChanges=[];this._workspaceEdit.changeAnnotations=this._changeAnnotations.all();}};WorkspaceChange.prototype.initChanges=function(){if(this._workspaceEdit.documentChanges===undefined&&this._workspaceEdit.changes===undefined){this._workspaceEdit.changes=Object.create(null);}};WorkspaceChange.prototype.createFile=function(uri,optionsOrAnnotation,options){this.initDocumentChanges();if(this._workspaceEdit.documentChanges===undefined){throw new Error('Workspace edit is not configured for document changes.');}
var annotation;if(ChangeAnnotation.is(optionsOrAnnotation)||ChangeAnnotationIdentifier.is(optionsOrAnnotation)){annotation=optionsOrAnnotation;}
else{options=optionsOrAnnotation;}
var operation;var id;if(annotation===undefined){operation=CreateFile.create(uri,options);}
else{id=ChangeAnnotationIdentifier.is(annotation)?annotation:this._changeAnnotations.manage(annotation);operation=CreateFile.create(uri,options,id);}
this._workspaceEdit.documentChanges.push(operation);if(id!==undefined){return id;}};WorkspaceChange.prototype.renameFile=function(oldUri,newUri,optionsOrAnnotation,options){this.initDocumentChanges();if(this._workspaceEdit.documentChanges===undefined){throw new Error('Workspace edit is not configured for document changes.');}
var annotation;if(ChangeAnnotation.is(optionsOrAnnotation)||ChangeAnnotationIdentifier.is(optionsOrAnnotation)){annotation=optionsOrAnnotation;}
else{options=optionsOrAnnotation;}
var operation;var id;if(annotation===undefined){operation=RenameFile.create(oldUri,newUri,options);}
else{id=ChangeAnnotationIdentifier.is(annotation)?annotation:this._changeAnnotations.manage(annotation);operation=RenameFile.create(oldUri,newUri,options,id);}
this._workspaceEdit.documentChanges.push(operation);if(id!==undefined){return id;}};WorkspaceChange.prototype.deleteFile=function(uri,optionsOrAnnotation,options){this.initDocumentChanges();if(this._workspaceEdit.documentChanges===undefined){throw new Error('Workspace edit is not configured for document changes.');}
var annotation;if(ChangeAnnotation.is(optionsOrAnnotation)||ChangeAnnotationIdentifier.is(optionsOrAnnotation)){annotation=optionsOrAnnotation;}
else{options=optionsOrAnnotation;}
var operation;var id;if(annotation===undefined){operation=DeleteFile.create(uri,options);}
else{id=ChangeAnnotationIdentifier.is(annotation)?annotation:this._changeAnnotations.manage(annotation);operation=DeleteFile.create(uri,options,id);}
this._workspaceEdit.documentChanges.push(operation);if(id!==undefined){return id;}};return WorkspaceChange;}());exports.WorkspaceChange=WorkspaceChange;var TextDocumentIdentifier;(function(TextDocumentIdentifier){function create(uri){return{uri:uri};}
TextDocumentIdentifier.create=create;function is(value){var candidate=value;return Is.defined(candidate)&&Is.string(candidate.uri);}
TextDocumentIdentifier.is=is;})(TextDocumentIdentifier=exports.TextDocumentIdentifier||(exports.TextDocumentIdentifier={}));var VersionedTextDocumentIdentifier;(function(VersionedTextDocumentIdentifier){function create(uri,version){return{uri:uri,version:version};}
VersionedTextDocumentIdentifier.create=create;function is(value){var candidate=value;return Is.defined(candidate)&&Is.string(candidate.uri)&&Is.integer(candidate.version);}
VersionedTextDocumentIdentifier.is=is;})(VersionedTextDocumentIdentifier=exports.VersionedTextDocumentIdentifier||(exports.VersionedTextDocumentIdentifier={}));var OptionalVersionedTextDocumentIdentifier;(function(OptionalVersionedTextDocumentIdentifier){function create(uri,version){return{uri:uri,version:version};}
OptionalVersionedTextDocumentIdentifier.create=create;function is(value){var candidate=value;return Is.defined(candidate)&&Is.string(candidate.uri)&&(candidate.version===null||Is.integer(candidate.version));}
OptionalVersionedTextDocumentIdentifier.is=is;})(OptionalVersionedTextDocumentIdentifier=exports.OptionalVersionedTextDocumentIdentifier||(exports.OptionalVersionedTextDocumentIdentifier={}));var TextDocumentItem;(function(TextDocumentItem){function create(uri,languageId,version,text){return{uri:uri,languageId:languageId,version:version,text:text};}
TextDocumentItem.create=create;function is(value){var candidate=value;return Is.defined(candidate)&&Is.string(candidate.uri)&&Is.string(candidate.languageId)&&Is.integer(candidate.version)&&Is.string(candidate.text);}
TextDocumentItem.is=is;})(TextDocumentItem=exports.TextDocumentItem||(exports.TextDocumentItem={}));var MarkupKind;(function(MarkupKind){MarkupKind.PlainText='plaintext';MarkupKind.Markdown='markdown';})(MarkupKind=exports.MarkupKind||(exports.MarkupKind={}));(function(MarkupKind){function is(value){var candidate=value;return candidate===MarkupKind.PlainText||candidate===MarkupKind.Markdown;}
MarkupKind.is=is;})(MarkupKind=exports.MarkupKind||(exports.MarkupKind={}));var MarkupContent;(function(MarkupContent){function is(value){var candidate=value;return Is.objectLiteral(value)&&MarkupKind.is(candidate.kind)&&Is.string(candidate.value);}
MarkupContent.is=is;})(MarkupContent=exports.MarkupContent||(exports.MarkupContent={}));var CompletionItemKind;(function(CompletionItemKind){CompletionItemKind.Text=1;CompletionItemKind.Method=2;CompletionItemKind.Function=3;CompletionItemKind.Constructor=4;CompletionItemKind.Field=5;CompletionItemKind.Variable=6;CompletionItemKind.Class=7;CompletionItemKind.Interface=8;CompletionItemKind.Module=9;CompletionItemKind.Property=10;CompletionItemKind.Unit=11;CompletionItemKind.Value=12;CompletionItemKind.Enum=13;CompletionItemKind.Keyword=14;CompletionItemKind.Snippet=15;CompletionItemKind.Color=16;CompletionItemKind.File=17;CompletionItemKind.Reference=18;CompletionItemKind.Folder=19;CompletionItemKind.EnumMember=20;CompletionItemKind.Constant=21;CompletionItemKind.Struct=22;CompletionItemKind.Event=23;CompletionItemKind.Operator=24;CompletionItemKind.TypeParameter=25;})(CompletionItemKind=exports.CompletionItemKind||(exports.CompletionItemKind={}));var InsertTextFormat;(function(InsertTextFormat){InsertTextFormat.PlainText=1;InsertTextFormat.Snippet=2;})(InsertTextFormat=exports.InsertTextFormat||(exports.InsertTextFormat={}));var CompletionItemTag;(function(CompletionItemTag){CompletionItemTag.Deprecated=1;})(CompletionItemTag=exports.CompletionItemTag||(exports.CompletionItemTag={}));var InsertReplaceEdit;(function(InsertReplaceEdit){function create(newText,insert,replace){return{newText:newText,insert:insert,replace:replace};}
InsertReplaceEdit.create=create;function is(value){var candidate=value;return candidate&&Is.string(candidate.newText)&&Range.is(candidate.insert)&&Range.is(candidate.replace);}
InsertReplaceEdit.is=is;})(InsertReplaceEdit=exports.InsertReplaceEdit||(exports.InsertReplaceEdit={}));var InsertTextMode;(function(InsertTextMode){InsertTextMode.asIs=1;InsertTextMode.adjustIndentation=2;})(InsertTextMode=exports.InsertTextMode||(exports.InsertTextMode={}));var CompletionItem;(function(CompletionItem){function create(label){return{label:label};}
CompletionItem.create=create;})(CompletionItem=exports.CompletionItem||(exports.CompletionItem={}));var CompletionList;(function(CompletionList){function create(items,isIncomplete){return{items:items?items:[],isIncomplete:!!isIncomplete};}
CompletionList.create=create;})(CompletionList=exports.CompletionList||(exports.CompletionList={}));var MarkedString;(function(MarkedString){function fromPlainText(plainText){return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g,'\\$&');}
MarkedString.fromPlainText=fromPlainText;function is(value){var candidate=value;return Is.string(candidate)||(Is.objectLiteral(candidate)&&Is.string(candidate.language)&&Is.string(candidate.value));}
MarkedString.is=is;})(MarkedString=exports.MarkedString||(exports.MarkedString={}));var Hover;(function(Hover){function is(value){var candidate=value;return!!candidate&&Is.objectLiteral(candidate)&&(MarkupContent.is(candidate.contents)||MarkedString.is(candidate.contents)||Is.typedArray(candidate.contents,MarkedString.is))&&(value.range===undefined||Range.is(value.range));}
Hover.is=is;})(Hover=exports.Hover||(exports.Hover={}));var ParameterInformation;(function(ParameterInformation){function create(label,documentation){return documentation?{label:label,documentation:documentation}:{label:label};}
ParameterInformation.create=create;})(ParameterInformation=exports.ParameterInformation||(exports.ParameterInformation={}));var SignatureInformation;(function(SignatureInformation){function create(label,documentation){var parameters=[];for(var _i=2;_i<arguments.length;_i++){parameters[_i-2]=arguments[_i];}
var result={label:label};if(Is.defined(documentation)){result.documentation=documentation;}
if(Is.defined(parameters)){result.parameters=parameters;}
else{result.parameters=[];}
return result;}
SignatureInformation.create=create;})(SignatureInformation=exports.SignatureInformation||(exports.SignatureInformation={}));var DocumentHighlightKind;(function(DocumentHighlightKind){DocumentHighlightKind.Text=1;DocumentHighlightKind.Read=2;DocumentHighlightKind.Write=3;})(DocumentHighlightKind=exports.DocumentHighlightKind||(exports.DocumentHighlightKind={}));var DocumentHighlight;(function(DocumentHighlight){function create(range,kind){var result={range:range};if(Is.number(kind)){result.kind=kind;}
return result;}
DocumentHighlight.create=create;})(DocumentHighlight=exports.DocumentHighlight||(exports.DocumentHighlight={}));var SymbolKind;(function(SymbolKind){SymbolKind.File=1;SymbolKind.Module=2;SymbolKind.Namespace=3;SymbolKind.Package=4;SymbolKind.Class=5;SymbolKind.Method=6;SymbolKind.Property=7;SymbolKind.Field=8;SymbolKind.Constructor=9;SymbolKind.Enum=10;SymbolKind.Interface=11;SymbolKind.Function=12;SymbolKind.Variable=13;SymbolKind.Constant=14;SymbolKind.String=15;SymbolKind.Number=16;SymbolKind.Boolean=17;SymbolKind.Array=18;SymbolKind.Object=19;SymbolKind.Key=20;SymbolKind.Null=21;SymbolKind.EnumMember=22;SymbolKind.Struct=23;SymbolKind.Event=24;SymbolKind.Operator=25;SymbolKind.TypeParameter=26;})(SymbolKind=exports.SymbolKind||(exports.SymbolKind={}));var SymbolTag;(function(SymbolTag){SymbolTag.Deprecated=1;})(SymbolTag=exports.SymbolTag||(exports.SymbolTag={}));var SymbolInformation;(function(SymbolInformation){function create(name,kind,range,uri,containerName){var result={name:name,kind:kind,location:{uri:uri,range:range}};if(containerName){result.containerName=containerName;}
return result;}
SymbolInformation.create=create;})(SymbolInformation=exports.SymbolInformation||(exports.SymbolInformation={}));var DocumentSymbol;(function(DocumentSymbol){function create(name,detail,kind,range,selectionRange,children){var result={name:name,detail:detail,kind:kind,range:range,selectionRange:selectionRange};if(children!==undefined){result.children=children;}
return result;}
DocumentSymbol.create=create;function is(value){var candidate=value;return candidate&&Is.string(candidate.name)&&Is.number(candidate.kind)&&Range.is(candidate.range)&&Range.is(candidate.selectionRange)&&(candidate.detail===undefined||Is.string(candidate.detail))&&(candidate.deprecated===undefined||Is.boolean(candidate.deprecated))&&(candidate.children===undefined||Array.isArray(candidate.children))&&(candidate.tags===undefined||Array.isArray(candidate.tags));}
DocumentSymbol.is=is;})(DocumentSymbol=exports.DocumentSymbol||(exports.DocumentSymbol={}));var CodeActionKind;(function(CodeActionKind){CodeActionKind.Empty='';CodeActionKind.QuickFix='quickfix';CodeActionKind.Refactor='refactor';CodeActionKind.RefactorExtract='refactor.extract';CodeActionKind.RefactorInline='refactor.inline';CodeActionKind.RefactorRewrite='refactor.rewrite';CodeActionKind.Source='source';CodeActionKind.SourceOrganizeImports='source.organizeImports';CodeActionKind.SourceFixAll='source.fixAll';})(CodeActionKind=exports.CodeActionKind||(exports.CodeActionKind={}));var CodeActionContext;(function(CodeActionContext){function create(diagnostics,only){var result={diagnostics:diagnostics};if(only!==undefined&&only!==null){result.only=only;}
return result;}
CodeActionContext.create=create;function is(value){var candidate=value;return Is.defined(candidate)&&Is.typedArray(candidate.diagnostics,Diagnostic.is)&&(candidate.only===undefined||Is.typedArray(candidate.only,Is.string));}
CodeActionContext.is=is;})(CodeActionContext=exports.CodeActionContext||(exports.CodeActionContext={}));var CodeAction;(function(CodeAction){function create(title,kindOrCommandOrEdit,kind){var result={title:title};var checkKind=true;if(typeof kindOrCommandOrEdit==='string'){checkKind=false;result.kind=kindOrCommandOrEdit;}
else if(Command.is(kindOrCommandOrEdit)){result.command=kindOrCommandOrEdit;}
else{result.edit=kindOrCommandOrEdit;}
if(checkKind&&kind!==undefined){result.kind=kind;}
return result;}
CodeAction.create=create;function is(value){var candidate=value;return candidate&&Is.string(candidate.title)&&(candidate.diagnostics===undefined||Is.typedArray(candidate.diagnostics,Diagnostic.is))&&(candidate.kind===undefined||Is.string(candidate.kind))&&(candidate.edit!==undefined||candidate.command!==undefined)&&(candidate.command===undefined||Command.is(candidate.command))&&(candidate.isPreferred===undefined||Is.boolean(candidate.isPreferred))&&(candidate.edit===undefined||WorkspaceEdit.is(candidate.edit));}
CodeAction.is=is;})(CodeAction=exports.CodeAction||(exports.CodeAction={}));var CodeLens;(function(CodeLens){function create(range,data){var result={range:range};if(Is.defined(data)){result.data=data;}
return result;}
CodeLens.create=create;function is(value){var candidate=value;return Is.defined(candidate)&&Range.is(candidate.range)&&(Is.undefined(candidate.command)||Command.is(candidate.command));}
CodeLens.is=is;})(CodeLens=exports.CodeLens||(exports.CodeLens={}));var FormattingOptions;(function(FormattingOptions){function create(tabSize,insertSpaces){return{tabSize:tabSize,insertSpaces:insertSpaces};}
FormattingOptions.create=create;function is(value){var candidate=value;return Is.defined(candidate)&&Is.uinteger(candidate.tabSize)&&Is.boolean(candidate.insertSpaces);}
FormattingOptions.is=is;})(FormattingOptions=exports.FormattingOptions||(exports.FormattingOptions={}));var DocumentLink;(function(DocumentLink){function create(range,target,data){return{range:range,target:target,data:data};}
DocumentLink.create=create;function is(value){var candidate=value;return Is.defined(candidate)&&Range.is(candidate.range)&&(Is.undefined(candidate.target)||Is.string(candidate.target));}
DocumentLink.is=is;})(DocumentLink=exports.DocumentLink||(exports.DocumentLink={}));var SelectionRange;(function(SelectionRange){function create(range,parent){return{range:range,parent:parent};}
SelectionRange.create=create;function is(value){var candidate=value;return candidate!==undefined&&Range.is(candidate.range)&&(candidate.parent===undefined||SelectionRange.is(candidate.parent));}
SelectionRange.is=is;})(SelectionRange=exports.SelectionRange||(exports.SelectionRange={}));exports.EOL=['\n','\r\n','\r'];var TextDocument;(function(TextDocument){function create(uri,languageId,version,content){return new FullTextDocument(uri,languageId,version,content);}
TextDocument.create=create;function is(value){var candidate=value;return Is.defined(candidate)&&Is.string(candidate.uri)&&(Is.undefined(candidate.languageId)||Is.string(candidate.languageId))&&Is.uinteger(candidate.lineCount)&&Is.func(candidate.getText)&&Is.func(candidate.positionAt)&&Is.func(candidate.offsetAt)?true:false;}
TextDocument.is=is;function applyEdits(document,edits){var text=document.getText();var sortedEdits=mergeSort(edits,function(a,b){var diff=a.range.start.line-b.range.start.line;if(diff===0){return a.range.start.character-b.range.start.character;}
return diff;});var lastModifiedOffset=text.length;for(var i=sortedEdits.length-1;i>=0;i--){var e=sortedEdits[i];var startOffset=document.offsetAt(e.range.start);var endOffset=document.offsetAt(e.range.end);if(endOffset<=lastModifiedOffset){text=text.substring(0,startOffset)+e.newText+text.substring(endOffset,text.length);}
else{throw new Error('Overlapping edit');}
lastModifiedOffset=startOffset;}
return text;}
TextDocument.applyEdits=applyEdits;function mergeSort(data,compare){if(data.length<=1){return data;}
var p=(data.length/2)|0;var left=data.slice(0,p);var right=data.slice(p);mergeSort(left,compare);mergeSort(right,compare);var leftIdx=0;var rightIdx=0;var i=0;while(leftIdx<left.length&&rightIdx<right.length){var ret=compare(left[leftIdx],right[rightIdx]);if(ret<=0){data[i++]=left[leftIdx++];}
else{data[i++]=right[rightIdx++];}}
while(leftIdx<left.length){data[i++]=left[leftIdx++];}
while(rightIdx<right.length){data[i++]=right[rightIdx++];}
return data;}})(TextDocument=exports.TextDocument||(exports.TextDocument={}));var FullTextDocument=(function(){function FullTextDocument(uri,languageId,version,content){this._uri=uri;this._languageId=languageId;this._version=version;this._content=content;this._lineOffsets=undefined;}
Object.defineProperty(FullTextDocument.prototype,"uri",{get:function(){return this._uri;},enumerable:false,configurable:true});Object.defineProperty(FullTextDocument.prototype,"languageId",{get:function(){return this._languageId;},enumerable:false,configurable:true});Object.defineProperty(FullTextDocument.prototype,"version",{get:function(){return this._version;},enumerable:false,configurable:true});FullTextDocument.prototype.getText=function(range){if(range){var start=this.offsetAt(range.start);var end=this.offsetAt(range.end);return this._content.substring(start,end);}
return this._content;};FullTextDocument.prototype.update=function(event,version){this._content=event.text;this._version=version;this._lineOffsets=undefined;};FullTextDocument.prototype.getLineOffsets=function(){if(this._lineOffsets===undefined){var lineOffsets=[];var text=this._content;var isLineStart=true;for(var i=0;i<text.length;i++){if(isLineStart){lineOffsets.push(i);isLineStart=false;}
var ch=text.charAt(i);isLineStart=(ch==='\r'||ch==='\n');if(ch==='\r'&&i+1<text.length&&text.charAt(i+1)==='\n'){i++;}}
if(isLineStart&&text.length>0){lineOffsets.push(text.length);}
this._lineOffsets=lineOffsets;}
return this._lineOffsets;};FullTextDocument.prototype.positionAt=function(offset){offset=Math.max(Math.min(offset,this._content.length),0);var lineOffsets=this.getLineOffsets();var low=0,high=lineOffsets.length;if(high===0){return Position.create(0,offset);}
while(low<high){var mid=Math.floor((low+high)/2);if(lineOffsets[mid]>offset){high=mid;}
else{low=mid+1;}}
var line=low-1;return Position.create(line,offset-lineOffsets[line]);};FullTextDocument.prototype.offsetAt=function(position){var lineOffsets=this.getLineOffsets();if(position.line>=lineOffsets.length){return this._content.length;}
else if(position.line<0){return 0;}
var lineOffset=lineOffsets[position.line];var nextLineOffset=(position.line+1<lineOffsets.length)?lineOffsets[position.line+1]:this._content.length;return Math.max(Math.min(lineOffset+position.character,nextLineOffset),lineOffset);};Object.defineProperty(FullTextDocument.prototype,"lineCount",{get:function(){return this.getLineOffsets().length;},enumerable:false,configurable:true});return FullTextDocument;}());var Is;(function(Is){var toString=Object.prototype.toString;function defined(value){return typeof value!=='undefined';}
Is.defined=defined;function undefined(value){return typeof value==='undefined';}
Is.undefined=undefined;function boolean(value){return value===true||value===false;}
Is.boolean=boolean;function string(value){return toString.call(value)==='[object String]';}
Is.string=string;function number(value){return toString.call(value)==='[object Number]';}
Is.number=number;function numberRange(value,min,max){return toString.call(value)==='[object Number]'&&min<=value&&value<=max;}
Is.numberRange=numberRange;function integer(value){return toString.call(value)==='[object Number]'&&-2147483648<=value&&value<=2147483647;}
Is.integer=integer;function uinteger(value){return toString.call(value)==='[object Number]'&&0<=value&&value<=2147483647;}
Is.uinteger=uinteger;function func(value){return toString.call(value)==='[object Function]';}
Is.func=func;function objectLiteral(value){return value!==null&&typeof value==='object';}
Is.objectLiteral=objectLiteral;function typedArray(value,check){return Array.isArray(value)&&value.every(check);}
Is.typedArray=typedArray;})(Is||(Is={}));});define('vscode-languageserver-types',['vscode-languageserver-types/main'],function(main){return main;});define('vs/language/json/languageFeatures',["require","exports","./fillers/monaco-editor-core","vscode-languageserver-types"],function(require,exports,monaco_editor_core_1,lsTypes){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.SelectionRangeAdapter=exports.FoldingRangeAdapter=exports.DocumentColorAdapter=exports.DocumentRangeFormattingEditProvider=exports.DocumentFormattingEditProvider=exports.DocumentSymbolAdapter=exports.HoverAdapter=exports.CompletionAdapter=exports.DiagnosticsAdapter=void 0;var DiagnosticsAdapter=(function(){function DiagnosticsAdapter(_languageId,_worker,defaults){var _this=this;this._languageId=_languageId;this._worker=_worker;this._disposables=[];this._listener=Object.create(null);var onModelAdd=function(model){var modeId=model.getLanguageId();if(modeId!==_this._languageId){return;}
var handle;_this._listener[model.uri.toString()]=model.onDidChangeContent(function(){clearTimeout(handle);handle=window.setTimeout(function(){return _this._doValidate(model.uri,modeId);},500);});_this._doValidate(model.uri,modeId);};var onModelRemoved=function(model){monaco_editor_core_1.editor.setModelMarkers(model,_this._languageId,[]);var uriStr=model.uri.toString();var listener=_this._listener[uriStr];if(listener){listener.dispose();delete _this._listener[uriStr];}};this._disposables.push(monaco_editor_core_1.editor.onDidCreateModel(onModelAdd));this._disposables.push(monaco_editor_core_1.editor.onWillDisposeModel(function(model){onModelRemoved(model);_this._resetSchema(model.uri);}));this._disposables.push(monaco_editor_core_1.editor.onDidChangeModelLanguage(function(event){onModelRemoved(event.model);onModelAdd(event.model);_this._resetSchema(event.model.uri);}));this._disposables.push(defaults.onDidChange(function(_){monaco_editor_core_1.editor.getModels().forEach(function(model){if(model.getLanguageId()===_this._languageId){onModelRemoved(model);onModelAdd(model);}});}));this._disposables.push({dispose:function(){monaco_editor_core_1.editor.getModels().forEach(onModelRemoved);for(var key in _this._listener){_this._listener[key].dispose();}}});monaco_editor_core_1.editor.getModels().forEach(onModelAdd);}
DiagnosticsAdapter.prototype.dispose=function(){this._disposables.forEach(function(d){return d&&d.dispose();});this._disposables=[];};DiagnosticsAdapter.prototype._resetSchema=function(resource){this._worker().then(function(worker){worker.resetSchema(resource.toString());});};DiagnosticsAdapter.prototype._doValidate=function(resource,languageId){this._worker(resource).then(function(worker){return worker.doValidation(resource.toString()).then(function(diagnostics){var markers=diagnostics.map(function(d){return toDiagnostics(resource,d);});var model=monaco_editor_core_1.editor.getModel(resource);if(model&&model.getLanguageId()===languageId){monaco_editor_core_1.editor.setModelMarkers(model,languageId,markers);}});}).then(undefined,function(err){console.error(err);});};return DiagnosticsAdapter;}());exports.DiagnosticsAdapter=DiagnosticsAdapter;function toSeverity(lsSeverity){switch(lsSeverity){case lsTypes.DiagnosticSeverity.Error:return monaco_editor_core_1.MarkerSeverity.Error;case lsTypes.DiagnosticSeverity.Warning:return monaco_editor_core_1.MarkerSeverity.Warning;case lsTypes.DiagnosticSeverity.Information:return monaco_editor_core_1.MarkerSeverity.Info;case lsTypes.DiagnosticSeverity.Hint:return monaco_editor_core_1.MarkerSeverity.Hint;default:return monaco_editor_core_1.MarkerSeverity.Info;}}
function toDiagnostics(resource,diag){var code=typeof diag.code==='number'?String(diag.code):diag.code;return{severity:toSeverity(diag.severity),startLineNumber:diag.range.start.line+1,startColumn:diag.range.start.character+1,endLineNumber:diag.range.end.line+1,endColumn:diag.range.end.character+1,message:diag.message,code:code,source:diag.source};}
function fromPosition(position){if(!position){return void 0;}
return{character:position.column-1,line:position.lineNumber-1};}
function fromRange(range){if(!range){return void 0;}
return{start:{line:range.startLineNumber-1,character:range.startColumn-1},end:{line:range.endLineNumber-1,character:range.endColumn-1}};}
function toRange(range){if(!range){return void 0;}
return new monaco_editor_core_1.Range(range.start.line+1,range.start.character+1,range.end.line+1,range.end.character+1);}
function isInsertReplaceEdit(edit){return(typeof edit.insert!=='undefined'&&typeof edit.replace!=='undefined');}
function toCompletionItemKind(kind){var mItemKind=monaco_editor_core_1.languages.CompletionItemKind;switch(kind){case lsTypes.CompletionItemKind.Text:return mItemKind.Text;case lsTypes.CompletionItemKind.Method:return mItemKind.Method;case lsTypes.CompletionItemKind.Function:return mItemKind.Function;case lsTypes.CompletionItemKind.Constructor:return mItemKind.Constructor;case lsTypes.CompletionItemKind.Field:return mItemKind.Field;case lsTypes.CompletionItemKind.Variable:return mItemKind.Variable;case lsTypes.CompletionItemKind.Class:return mItemKind.Class;case lsTypes.CompletionItemKind.Interface:return mItemKind.Interface;case lsTypes.CompletionItemKind.Module:return mItemKind.Module;case lsTypes.CompletionItemKind.Property:return mItemKind.Property;case lsTypes.CompletionItemKind.Unit:return mItemKind.Unit;case lsTypes.CompletionItemKind.Value:return mItemKind.Value;case lsTypes.CompletionItemKind.Enum:return mItemKind.Enum;case lsTypes.CompletionItemKind.Keyword:return mItemKind.Keyword;case lsTypes.CompletionItemKind.Snippet:return mItemKind.Snippet;case lsTypes.CompletionItemKind.Color:return mItemKind.Color;case lsTypes.CompletionItemKind.File:return mItemKind.File;case lsTypes.CompletionItemKind.Reference:return mItemKind.Reference;}
return mItemKind.Property;}
function fromCompletionItemKind(kind){var mItemKind=monaco_editor_core_1.languages.CompletionItemKind;switch(kind){case mItemKind.Text:return lsTypes.CompletionItemKind.Text;case mItemKind.Method:return lsTypes.CompletionItemKind.Method;case mItemKind.Function:return lsTypes.CompletionItemKind.Function;case mItemKind.Constructor:return lsTypes.CompletionItemKind.Constructor;case mItemKind.Field:return lsTypes.CompletionItemKind.Field;case mItemKind.Variable:return lsTypes.CompletionItemKind.Variable;case mItemKind.Class:return lsTypes.CompletionItemKind.Class;case mItemKind.Interface:return lsTypes.CompletionItemKind.Interface;case mItemKind.Module:return lsTypes.CompletionItemKind.Module;case mItemKind.Property:return lsTypes.CompletionItemKind.Property;case mItemKind.Unit:return lsTypes.CompletionItemKind.Unit;case mItemKind.Value:return lsTypes.CompletionItemKind.Value;case mItemKind.Enum:return lsTypes.CompletionItemKind.Enum;case mItemKind.Keyword:return lsTypes.CompletionItemKind.Keyword;case mItemKind.Snippet:return lsTypes.CompletionItemKind.Snippet;case mItemKind.Color:return lsTypes.CompletionItemKind.Color;case mItemKind.File:return lsTypes.CompletionItemKind.File;case mItemKind.Reference:return lsTypes.CompletionItemKind.Reference;}
return lsTypes.CompletionItemKind.Property;}
function toTextEdit(textEdit){if(!textEdit){return void 0;}
return{range:toRange(textEdit.range),text:textEdit.newText};}
function toCommand(c){return c&&c.command==='editor.action.triggerSuggest'?{id:c.command,title:c.title,arguments:c.arguments}:undefined;}
var CompletionAdapter=(function(){function CompletionAdapter(_worker){this._worker=_worker;}
Object.defineProperty(CompletionAdapter.prototype,"triggerCharacters",{get:function(){return[' ',':','"'];},enumerable:false,configurable:true});CompletionAdapter.prototype.provideCompletionItems=function(model,position,context,token){var resource=model.uri;return this._worker(resource).then(function(worker){return worker.doComplete(resource.toString(),fromPosition(position));}).then(function(info){if(!info){return;}
var wordInfo=model.getWordUntilPosition(position);var wordRange=new monaco_editor_core_1.Range(position.lineNumber,wordInfo.startColumn,position.lineNumber,wordInfo.endColumn);var items=info.items.map(function(entry){var item={label:entry.label,insertText:entry.insertText||entry.label,sortText:entry.sortText,filterText:entry.filterText,documentation:entry.documentation,detail:entry.detail,command:toCommand(entry.command),range:wordRange,kind:toCompletionItemKind(entry.kind)};if(entry.textEdit){if(isInsertReplaceEdit(entry.textEdit)){item.range={insert:toRange(entry.textEdit.insert),replace:toRange(entry.textEdit.replace)};}
else{item.range=toRange(entry.textEdit.range);}
item.insertText=entry.textEdit.newText;}
if(entry.additionalTextEdits){item.additionalTextEdits=entry.additionalTextEdits.map(toTextEdit);}
if(entry.insertTextFormat===lsTypes.InsertTextFormat.Snippet){item.insertTextRules=monaco_editor_core_1.languages.CompletionItemInsertTextRule.InsertAsSnippet;}
return item;});return{isIncomplete:info.isIncomplete,suggestions:items};});};return CompletionAdapter;}());exports.CompletionAdapter=CompletionAdapter;function isMarkupContent(thing){return(thing&&typeof thing==='object'&&typeof thing.kind==='string');}
function toMarkdownString(entry){if(typeof entry==='string'){return{value:entry};}
if(isMarkupContent(entry)){if(entry.kind==='plaintext'){return{value:entry.value.replace(/[\\`*_{}[\]()#+\-.!]/g,'\\$&')};}
return{value:entry.value};}
return{value:'```'+entry.language+'\n'+entry.value+'\n```\n'};}
function toMarkedStringArray(contents){if(!contents){return void 0;}
if(Array.isArray(contents)){return contents.map(toMarkdownString);}
return[toMarkdownString(contents)];}
var HoverAdapter=(function(){function HoverAdapter(_worker){this._worker=_worker;}
HoverAdapter.prototype.provideHover=function(model,position,token){var resource=model.uri;return this._worker(resource).then(function(worker){return worker.doHover(resource.toString(),fromPosition(position));}).then(function(info){if(!info){return;}
return{range:toRange(info.range),contents:toMarkedStringArray(info.contents)};});};return HoverAdapter;}());exports.HoverAdapter=HoverAdapter;function toLocation(location){return{uri:monaco_editor_core_1.Uri.parse(location.uri),range:toRange(location.range)};}
function toSymbolKind(kind){var mKind=monaco_editor_core_1.languages.SymbolKind;switch(kind){case lsTypes.SymbolKind.File:return mKind.Array;case lsTypes.SymbolKind.Module:return mKind.Module;case lsTypes.SymbolKind.Namespace:return mKind.Namespace;case lsTypes.SymbolKind.Package:return mKind.Package;case lsTypes.SymbolKind.Class:return mKind.Class;case lsTypes.SymbolKind.Method:return mKind.Method;case lsTypes.SymbolKind.Property:return mKind.Property;case lsTypes.SymbolKind.Field:return mKind.Field;case lsTypes.SymbolKind.Constructor:return mKind.Constructor;case lsTypes.SymbolKind.Enum:return mKind.Enum;case lsTypes.SymbolKind.Interface:return mKind.Interface;case lsTypes.SymbolKind.Function:return mKind.Function;case lsTypes.SymbolKind.Variable:return mKind.Variable;case lsTypes.SymbolKind.Constant:return mKind.Constant;case lsTypes.SymbolKind.String:return mKind.String;case lsTypes.SymbolKind.Number:return mKind.Number;case lsTypes.SymbolKind.Boolean:return mKind.Boolean;case lsTypes.SymbolKind.Array:return mKind.Array;}
return mKind.Function;}
var DocumentSymbolAdapter=(function(){function DocumentSymbolAdapter(_worker){this._worker=_worker;}
DocumentSymbolAdapter.prototype.provideDocumentSymbols=function(model,token){var resource=model.uri;return this._worker(resource).then(function(worker){return worker.findDocumentSymbols(resource.toString());}).then(function(items){if(!items){return;}
return items.map(function(item){return({name:item.name,detail:'',containerName:item.containerName,kind:toSymbolKind(item.kind),range:toRange(item.location.range),selectionRange:toRange(item.location.range),tags:[]});});});};return DocumentSymbolAdapter;}());exports.DocumentSymbolAdapter=DocumentSymbolAdapter;function fromFormattingOptions(options){return{tabSize:options.tabSize,insertSpaces:options.insertSpaces};}
var DocumentFormattingEditProvider=(function(){function DocumentFormattingEditProvider(_worker){this._worker=_worker;}
DocumentFormattingEditProvider.prototype.provideDocumentFormattingEdits=function(model,options,token){var resource=model.uri;return this._worker(resource).then(function(worker){return worker.format(resource.toString(),null,fromFormattingOptions(options)).then(function(edits){if(!edits||edits.length===0){return;}
return edits.map(toTextEdit);});});};return DocumentFormattingEditProvider;}());exports.DocumentFormattingEditProvider=DocumentFormattingEditProvider;var DocumentRangeFormattingEditProvider=(function(){function DocumentRangeFormattingEditProvider(_worker){this._worker=_worker;}
DocumentRangeFormattingEditProvider.prototype.provideDocumentRangeFormattingEdits=function(model,range,options,token){var resource=model.uri;return this._worker(resource).then(function(worker){return worker.format(resource.toString(),fromRange(range),fromFormattingOptions(options)).then(function(edits){if(!edits||edits.length===0){return;}
return edits.map(toTextEdit);});});};return DocumentRangeFormattingEditProvider;}());exports.DocumentRangeFormattingEditProvider=DocumentRangeFormattingEditProvider;var DocumentColorAdapter=(function(){function DocumentColorAdapter(_worker){this._worker=_worker;}
DocumentColorAdapter.prototype.provideDocumentColors=function(model,token){var resource=model.uri;return this._worker(resource).then(function(worker){return worker.findDocumentColors(resource.toString());}).then(function(infos){if(!infos){return;}
return infos.map(function(item){return({color:item.color,range:toRange(item.range)});});});};DocumentColorAdapter.prototype.provideColorPresentations=function(model,info,token){var resource=model.uri;return this._worker(resource).then(function(worker){return worker.getColorPresentations(resource.toString(),info.color,fromRange(info.range));}).then(function(presentations){if(!presentations){return;}
return presentations.map(function(presentation){var item={label:presentation.label};if(presentation.textEdit){item.textEdit=toTextEdit(presentation.textEdit);}
if(presentation.additionalTextEdits){item.additionalTextEdits=presentation.additionalTextEdits.map(toTextEdit);}
return item;});});};return DocumentColorAdapter;}());exports.DocumentColorAdapter=DocumentColorAdapter;var FoldingRangeAdapter=(function(){function FoldingRangeAdapter(_worker){this._worker=_worker;}
FoldingRangeAdapter.prototype.provideFoldingRanges=function(model,context,token){var resource=model.uri;return this._worker(resource).then(function(worker){return worker.getFoldingRanges(resource.toString(),context);}).then(function(ranges){if(!ranges){return;}
return ranges.map(function(range){var result={start:range.startLine+1,end:range.endLine+1};if(typeof range.kind!=='undefined'){result.kind=toFoldingRangeKind(range.kind);}
return result;});});};return FoldingRangeAdapter;}());exports.FoldingRangeAdapter=FoldingRangeAdapter;function toFoldingRangeKind(kind){switch(kind){case lsTypes.FoldingRangeKind.Comment:return monaco_editor_core_1.languages.FoldingRangeKind.Comment;case lsTypes.FoldingRangeKind.Imports:return monaco_editor_core_1.languages.FoldingRangeKind.Imports;case lsTypes.FoldingRangeKind.Region:return monaco_editor_core_1.languages.FoldingRangeKind.Region;}
return void 0;}
var SelectionRangeAdapter=(function(){function SelectionRangeAdapter(_worker){this._worker=_worker;}
SelectionRangeAdapter.prototype.provideSelectionRanges=function(model,positions,token){var resource=model.uri;return this._worker(resource).then(function(worker){return worker.getSelectionRanges(resource.toString(),positions.map(fromPosition));}).then(function(selectionRanges){if(!selectionRanges){return;}
return selectionRanges.map(function(selectionRange){var result=[];while(selectionRange){result.push({range:toRange(selectionRange.range)});selectionRange=selectionRange.parent;}
return result;});});};return SelectionRangeAdapter;}());exports.SelectionRangeAdapter=SelectionRangeAdapter;});(function(factory){if(typeof module==="object"&&typeof module.exports==="object"){var v=factory(require,exports);if(v!==undefined)module.exports=v;}
else if(typeof define==="function"&&define.amd){define('jsonc-parser/impl/scanner',["require","exports"],factory);}})(function(require,exports){'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.createScanner=void 0;function createScanner(text,ignoreTrivia){if(ignoreTrivia===void 0){ignoreTrivia=false;}
var len=text.length;var pos=0,value='',tokenOffset=0,token=16,lineNumber=0,lineStartOffset=0,tokenLineStartOffset=0,prevTokenLineStartOffset=0,scanError=0;function scanHexDigits(count,exact){var digits=0;var value=0;while(digits<count||!exact){var ch=text.charCodeAt(pos);if(ch>=48&&ch<=57){value=value*16+ch-48;}
else if(ch>=65&&ch<=70){value=value*16+ch-65+10;}
else if(ch>=97&&ch<=102){value=value*16+ch-97+10;}
else{break;}
pos++;digits++;}
if(digits<count){value=-1;}
return value;}
function setPosition(newPosition){pos=newPosition;value='';tokenOffset=0;token=16;scanError=0;}
function scanNumber(){var start=pos;if(text.charCodeAt(pos)===48){pos++;}
else{pos++;while(pos<text.length&&isDigit(text.charCodeAt(pos))){pos++;}}
if(pos<text.length&&text.charCodeAt(pos)===46){pos++;if(pos<text.length&&isDigit(text.charCodeAt(pos))){pos++;while(pos<text.length&&isDigit(text.charCodeAt(pos))){pos++;}}
else{scanError=3;return text.substring(start,pos);}}
var end=pos;if(pos<text.length&&(text.charCodeAt(pos)===69||text.charCodeAt(pos)===101)){pos++;if(pos<text.length&&text.charCodeAt(pos)===43||text.charCodeAt(pos)===45){pos++;}
if(pos<text.length&&isDigit(text.charCodeAt(pos))){pos++;while(pos<text.length&&isDigit(text.charCodeAt(pos))){pos++;}
end=pos;}
else{scanError=3;}}
return text.substring(start,end);}
function scanString(){var result='',start=pos;while(true){if(pos>=len){result+=text.substring(start,pos);scanError=2;break;}
var ch=text.charCodeAt(pos);if(ch===34){result+=text.substring(start,pos);pos++;break;}
if(ch===92){result+=text.substring(start,pos);pos++;if(pos>=len){scanError=2;break;}
var ch2=text.charCodeAt(pos++);switch(ch2){case 34:result+='\"';break;case 92:result+='\\';break;case 47:result+='/';break;case 98:result+='\b';break;case 102:result+='\f';break;case 110:result+='\n';break;case 114:result+='\r';break;case 116:result+='\t';break;case 117:var ch3=scanHexDigits(4,true);if(ch3>=0){result+=String.fromCharCode(ch3);}
else{scanError=4;}
break;default:scanError=5;}
start=pos;continue;}
if(ch>=0&&ch<=0x1f){if(isLineBreak(ch)){result+=text.substring(start,pos);scanError=2;break;}
else{scanError=6;}}
pos++;}
return result;}
function scanNext(){value='';scanError=0;tokenOffset=pos;lineStartOffset=lineNumber;prevTokenLineStartOffset=tokenLineStartOffset;if(pos>=len){tokenOffset=len;return token=17;}
var code=text.charCodeAt(pos);if(isWhiteSpace(code)){do{pos++;value+=String.fromCharCode(code);code=text.charCodeAt(pos);}while(isWhiteSpace(code));return token=15;}
if(isLineBreak(code)){pos++;value+=String.fromCharCode(code);if(code===13&&text.charCodeAt(pos)===10){pos++;value+='\n';}
lineNumber++;tokenLineStartOffset=pos;return token=14;}
switch(code){case 123:pos++;return token=1;case 125:pos++;return token=2;case 91:pos++;return token=3;case 93:pos++;return token=4;case 58:pos++;return token=6;case 44:pos++;return token=5;case 34:pos++;value=scanString();return token=10;case 47:var start=pos-1;if(text.charCodeAt(pos+1)===47){pos+=2;while(pos<len){if(isLineBreak(text.charCodeAt(pos))){break;}
pos++;}
value=text.substring(start,pos);return token=12;}
if(text.charCodeAt(pos+1)===42){pos+=2;var safeLength=len-1;var commentClosed=false;while(pos<safeLength){var ch=text.charCodeAt(pos);if(ch===42&&text.charCodeAt(pos+1)===47){pos+=2;commentClosed=true;break;}
pos++;if(isLineBreak(ch)){if(ch===13&&text.charCodeAt(pos)===10){pos++;}
lineNumber++;tokenLineStartOffset=pos;}}
if(!commentClosed){pos++;scanError=1;}
value=text.substring(start,pos);return token=13;}
value+=String.fromCharCode(code);pos++;return token=16;case 45:value+=String.fromCharCode(code);pos++;if(pos===len||!isDigit(text.charCodeAt(pos))){return token=16;}
case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:value+=scanNumber();return token=11;default:while(pos<len&&isUnknownContentCharacter(code)){pos++;code=text.charCodeAt(pos);}
if(tokenOffset!==pos){value=text.substring(tokenOffset,pos);switch(value){case 'true':return token=8;case 'false':return token=9;case 'null':return token=7;}
return token=16;}
value+=String.fromCharCode(code);pos++;return token=16;}}
function isUnknownContentCharacter(code){if(isWhiteSpace(code)||isLineBreak(code)){return false;}
switch(code){case 125:case 93:case 123:case 91:case 34:case 58:case 44:case 47:return false;}
return true;}
function scanNextNonTrivia(){var result;do{result=scanNext();}while(result>=12&&result<=15);return result;}
return{setPosition:setPosition,getPosition:function(){return pos;},scan:ignoreTrivia?scanNextNonTrivia:scanNext,getToken:function(){return token;},getTokenValue:function(){return value;},getTokenOffset:function(){return tokenOffset;},getTokenLength:function(){return pos-tokenOffset;},getTokenStartLine:function(){return lineStartOffset;},getTokenStartCharacter:function(){return tokenOffset-prevTokenLineStartOffset;},getTokenError:function(){return scanError;},};}
exports.createScanner=createScanner;function isWhiteSpace(ch){return ch===32||ch===9||ch===11||ch===12||ch===160||ch===5760||ch>=8192&&ch<=8203||ch===8239||ch===8287||ch===12288||ch===65279;}
function isLineBreak(ch){return ch===10||ch===13||ch===8232||ch===8233;}
function isDigit(ch){return ch>=48&&ch<=57;}});(function(factory){if(typeof module==="object"&&typeof module.exports==="object"){var v=factory(require,exports);if(v!==undefined)module.exports=v;}
else if(typeof define==="function"&&define.amd){define('jsonc-parser/impl/format',["require","exports","./scanner"],factory);}})(function(require,exports){'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.isEOL=exports.format=void 0;var scanner_1=require("./scanner");function format(documentText,range,options){var initialIndentLevel;var formatText;var formatTextStart;var rangeStart;var rangeEnd;if(range){rangeStart=range.offset;rangeEnd=rangeStart+range.length;formatTextStart=rangeStart;while(formatTextStart>0&&!isEOL(documentText,formatTextStart-1)){formatTextStart--;}
var endOffset=rangeEnd;while(endOffset<documentText.length&&!isEOL(documentText,endOffset)){endOffset++;}
formatText=documentText.substring(formatTextStart,endOffset);initialIndentLevel=computeIndentLevel(formatText,options);}
else{formatText=documentText;initialIndentLevel=0;formatTextStart=0;rangeStart=0;rangeEnd=documentText.length;}
var eol=getEOL(options,documentText);var lineBreak=false;var indentLevel=0;var indentValue;if(options.insertSpaces){indentValue=repeat(' ',options.tabSize||4);}
else{indentValue='\t';}
var scanner=scanner_1.createScanner(formatText,false);var hasError=false;function newLineAndIndent(){return eol+repeat(indentValue,initialIndentLevel+indentLevel);}
function scanNext(){var token=scanner.scan();lineBreak=false;while(token===15||token===14){lineBreak=lineBreak||(token===14);token=scanner.scan();}
hasError=token===16||scanner.getTokenError()!==0;return token;}
var editOperations=[];function addEdit(text,startOffset,endOffset){if(!hasError&&(!range||(startOffset<rangeEnd&&endOffset>rangeStart))&&documentText.substring(startOffset,endOffset)!==text){editOperations.push({offset:startOffset,length:endOffset-startOffset,content:text});}}
var firstToken=scanNext();if(firstToken!==17){var firstTokenStart=scanner.getTokenOffset()+formatTextStart;var initialIndent=repeat(indentValue,initialIndentLevel);addEdit(initialIndent,formatTextStart,firstTokenStart);}
while(firstToken!==17){var firstTokenEnd=scanner.getTokenOffset()+scanner.getTokenLength()+formatTextStart;var secondToken=scanNext();var replaceContent='';var needsLineBreak=false;while(!lineBreak&&(secondToken===12||secondToken===13)){var commentTokenStart=scanner.getTokenOffset()+formatTextStart;addEdit(' ',firstTokenEnd,commentTokenStart);firstTokenEnd=scanner.getTokenOffset()+scanner.getTokenLength()+formatTextStart;needsLineBreak=secondToken===12;replaceContent=needsLineBreak?newLineAndIndent():'';secondToken=scanNext();}
if(secondToken===2){if(firstToken!==1){indentLevel--;replaceContent=newLineAndIndent();}}
else if(secondToken===4){if(firstToken!==3){indentLevel--;replaceContent=newLineAndIndent();}}
else{switch(firstToken){case 3:case 1:indentLevel++;replaceContent=newLineAndIndent();break;case 5:case 12:replaceContent=newLineAndIndent();break;case 13:if(lineBreak){replaceContent=newLineAndIndent();}
else if(!needsLineBreak){replaceContent=' ';}
break;case 6:if(!needsLineBreak){replaceContent=' ';}
break;case 10:if(secondToken===6){if(!needsLineBreak){replaceContent='';}
break;}
case 7:case 8:case 9:case 11:case 2:case 4:if(secondToken===12||secondToken===13){if(!needsLineBreak){replaceContent=' ';}}
else if(secondToken!==5&&secondToken!==17){hasError=true;}
break;case 16:hasError=true;break;}
if(lineBreak&&(secondToken===12||secondToken===13)){replaceContent=newLineAndIndent();}}
if(secondToken===17){replaceContent=options.insertFinalNewline?eol:'';}
var secondTokenStart=scanner.getTokenOffset()+formatTextStart;addEdit(replaceContent,firstTokenEnd,secondTokenStart);firstToken=secondToken;}
return editOperations;}
exports.format=format;function repeat(s,count){var result='';for(var i=0;i<count;i++){result+=s;}
return result;}
function computeIndentLevel(content,options){var i=0;var nChars=0;var tabSize=options.tabSize||4;while(i<content.length){var ch=content.charAt(i);if(ch===' '){nChars++;}
else if(ch==='\t'){nChars+=tabSize;}
else{break;}
i++;}
return Math.floor(nChars/tabSize);}
function getEOL(options,text){for(var i=0;i<text.length;i++){var ch=text.charAt(i);if(ch==='\r'){if(i+1<text.length&&text.charAt(i+1)==='\n'){return '\r\n';}
return '\r';}
else if(ch==='\n'){return '\n';}}
return(options&&options.eol)||'\n';}
function isEOL(text,offset){return '\r\n'.indexOf(text.charAt(offset))!==-1;}
exports.isEOL=isEOL;});(function(factory){if(typeof module==="object"&&typeof module.exports==="object"){var v=factory(require,exports);if(v!==undefined)module.exports=v;}
else if(typeof define==="function"&&define.amd){define('jsonc-parser/impl/parser',["require","exports","./scanner"],factory);}})(function(require,exports){'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.getNodeType=exports.stripComments=exports.visit=exports.findNodeAtOffset=exports.contains=exports.getNodeValue=exports.getNodePath=exports.findNodeAtLocation=exports.parseTree=exports.parse=exports.getLocation=void 0;var scanner_1=require("./scanner");var ParseOptions;(function(ParseOptions){ParseOptions.DEFAULT={allowTrailingComma:false};})(ParseOptions||(ParseOptions={}));function getLocation(text,position){var segments=[];var earlyReturnException=new Object();var previousNode=undefined;var previousNodeInst={value:{},offset:0,length:0,type:'object',parent:undefined};var isAtPropertyKey=false;function setPreviousNode(value,offset,length,type){previousNodeInst.value=value;previousNodeInst.offset=offset;previousNodeInst.length=length;previousNodeInst.type=type;previousNodeInst.colonOffset=undefined;previousNode=previousNodeInst;}
try{visit(text,{onObjectBegin:function(offset,length){if(position<=offset){throw earlyReturnException;}
previousNode=undefined;isAtPropertyKey=position>offset;segments.push('');},onObjectProperty:function(name,offset,length){if(position<offset){throw earlyReturnException;}
setPreviousNode(name,offset,length,'property');segments[segments.length-1]=name;if(position<=offset+length){throw earlyReturnException;}},onObjectEnd:function(offset,length){if(position<=offset){throw earlyReturnException;}
previousNode=undefined;segments.pop();},onArrayBegin:function(offset,length){if(position<=offset){throw earlyReturnException;}
previousNode=undefined;segments.push(0);},onArrayEnd:function(offset,length){if(position<=offset){throw earlyReturnException;}
previousNode=undefined;segments.pop();},onLiteralValue:function(value,offset,length){if(position<offset){throw earlyReturnException;}
setPreviousNode(value,offset,length,getNodeType(value));if(position<=offset+length){throw earlyReturnException;}},onSeparator:function(sep,offset,length){if(position<=offset){throw earlyReturnException;}
if(sep===':'&&previousNode&&previousNode.type==='property'){previousNode.colonOffset=offset;isAtPropertyKey=false;previousNode=undefined;}
else if(sep===','){var last=segments[segments.length-1];if(typeof last==='number'){segments[segments.length-1]=last+1;}
else{isAtPropertyKey=true;segments[segments.length-1]='';}
previousNode=undefined;}}});}
catch(e){if(e!==earlyReturnException){throw e;}}
return{path:segments,previousNode:previousNode,isAtPropertyKey:isAtPropertyKey,matches:function(pattern){var k=0;for(var i=0;k<pattern.length&&i<segments.length;i++){if(pattern[k]===segments[i]||pattern[k]==='*'){k++;}
else if(pattern[k]!=='**'){return false;}}
return k===pattern.length;}};}
exports.getLocation=getLocation;function parse(text,errors,options){if(errors===void 0){errors=[];}
if(options===void 0){options=ParseOptions.DEFAULT;}
var currentProperty=null;var currentParent=[];var previousParents=[];function onValue(value){if(Array.isArray(currentParent)){currentParent.push(value);}
else if(currentProperty!==null){currentParent[currentProperty]=value;}}
var visitor={onObjectBegin:function(){var object={};onValue(object);previousParents.push(currentParent);currentParent=object;currentProperty=null;},onObjectProperty:function(name){currentProperty=name;},onObjectEnd:function(){currentParent=previousParents.pop();},onArrayBegin:function(){var array=[];onValue(array);previousParents.push(currentParent);currentParent=array;currentProperty=null;},onArrayEnd:function(){currentParent=previousParents.pop();},onLiteralValue:onValue,onError:function(error,offset,length){errors.push({error:error,offset:offset,length:length});}};visit(text,visitor,options);return currentParent[0];}
exports.parse=parse;function parseTree(text,errors,options){if(errors===void 0){errors=[];}
if(options===void 0){options=ParseOptions.DEFAULT;}
var currentParent={type:'array',offset:-1,length:-1,children:[],parent:undefined};function ensurePropertyComplete(endOffset){if(currentParent.type==='property'){currentParent.length=endOffset-currentParent.offset;currentParent=currentParent.parent;}}
function onValue(valueNode){currentParent.children.push(valueNode);return valueNode;}
var visitor={onObjectBegin:function(offset){currentParent=onValue({type:'object',offset:offset,length:-1,parent:currentParent,children:[]});},onObjectProperty:function(name,offset,length){currentParent=onValue({type:'property',offset:offset,length:-1,parent:currentParent,children:[]});currentParent.children.push({type:'string',value:name,offset:offset,length:length,parent:currentParent});},onObjectEnd:function(offset,length){ensurePropertyComplete(offset+length);currentParent.length=offset+length-currentParent.offset;currentParent=currentParent.parent;ensurePropertyComplete(offset+length);},onArrayBegin:function(offset,length){currentParent=onValue({type:'array',offset:offset,length:-1,parent:currentParent,children:[]});},onArrayEnd:function(offset,length){currentParent.length=offset+length-currentParent.offset;currentParent=currentParent.parent;ensurePropertyComplete(offset+length);},onLiteralValue:function(value,offset,length){onValue({type:getNodeType(value),offset:offset,length:length,parent:currentParent,value:value});ensurePropertyComplete(offset+length);},onSeparator:function(sep,offset,length){if(currentParent.type==='property'){if(sep===':'){currentParent.colonOffset=offset;}
else if(sep===','){ensurePropertyComplete(offset);}}},onError:function(error,offset,length){errors.push({error:error,offset:offset,length:length});}};visit(text,visitor,options);var result=currentParent.children[0];if(result){delete result.parent;}
return result;}
exports.parseTree=parseTree;function findNodeAtLocation(root,path){if(!root){return undefined;}
var node=root;for(var _i=0,path_1=path;_i<path_1.length;_i++){var segment=path_1[_i];if(typeof segment==='string'){if(node.type!=='object'||!Array.isArray(node.children)){return undefined;}
var found=false;for(var _a=0,_b=node.children;_a<_b.length;_a++){var propertyNode=_b[_a];if(Array.isArray(propertyNode.children)&&propertyNode.children[0].value===segment){node=propertyNode.children[1];found=true;break;}}
if(!found){return undefined;}}
else{var index=segment;if(node.type!=='array'||index<0||!Array.isArray(node.children)||index>=node.children.length){return undefined;}
node=node.children[index];}}
return node;}
exports.findNodeAtLocation=findNodeAtLocation;function getNodePath(node){if(!node.parent||!node.parent.children){return[];}
var path=getNodePath(node.parent);if(node.parent.type==='property'){var key=node.parent.children[0].value;path.push(key);}
else if(node.parent.type==='array'){var index=node.parent.children.indexOf(node);if(index!==-1){path.push(index);}}
return path;}
exports.getNodePath=getNodePath;function getNodeValue(node){switch(node.type){case 'array':return node.children.map(getNodeValue);case 'object':var obj=Object.create(null);for(var _i=0,_a=node.children;_i<_a.length;_i++){var prop=_a[_i];var valueNode=prop.children[1];if(valueNode){obj[prop.children[0].value]=getNodeValue(valueNode);}}
return obj;case 'null':case 'string':case 'number':case 'boolean':return node.value;default:return undefined;}}
exports.getNodeValue=getNodeValue;function contains(node,offset,includeRightBound){if(includeRightBound===void 0){includeRightBound=false;}
return(offset>=node.offset&&offset<(node.offset+node.length))||includeRightBound&&(offset===(node.offset+node.length));}
exports.contains=contains;function findNodeAtOffset(node,offset,includeRightBound){if(includeRightBound===void 0){includeRightBound=false;}
if(contains(node,offset,includeRightBound)){var children=node.children;if(Array.isArray(children)){for(var i=0;i<children.length&&children[i].offset<=offset;i++){var item=findNodeAtOffset(children[i],offset,includeRightBound);if(item){return item;}}}
return node;}
return undefined;}
exports.findNodeAtOffset=findNodeAtOffset;function visit(text,visitor,options){if(options===void 0){options=ParseOptions.DEFAULT;}
var _scanner=scanner_1.createScanner(text,false);function toNoArgVisit(visitFunction){return visitFunction?function(){return visitFunction(_scanner.getTokenOffset(),_scanner.getTokenLength(),_scanner.getTokenStartLine(),_scanner.getTokenStartCharacter());}:function(){return true;};}
function toOneArgVisit(visitFunction){return visitFunction?function(arg){return visitFunction(arg,_scanner.getTokenOffset(),_scanner.getTokenLength(),_scanner.getTokenStartLine(),_scanner.getTokenStartCharacter());}:function(){return true;};}
var onObjectBegin=toNoArgVisit(visitor.onObjectBegin),onObjectProperty=toOneArgVisit(visitor.onObjectProperty),onObjectEnd=toNoArgVisit(visitor.onObjectEnd),onArrayBegin=toNoArgVisit(visitor.onArrayBegin),onArrayEnd=toNoArgVisit(visitor.onArrayEnd),onLiteralValue=toOneArgVisit(visitor.onLiteralValue),onSeparator=toOneArgVisit(visitor.onSeparator),onComment=toNoArgVisit(visitor.onComment),onError=toOneArgVisit(visitor.onError);var disallowComments=options&&options.disallowComments;var allowTrailingComma=options&&options.allowTrailingComma;function scanNext(){while(true){var token=_scanner.scan();switch(_scanner.getTokenError()){case 4:handleError(14);break;case 5:handleError(15);break;case 3:handleError(13);break;case 1:if(!disallowComments){handleError(11);}
break;case 2:handleError(12);break;case 6:handleError(16);break;}
switch(token){case 12:case 13:if(disallowComments){handleError(10);}
else{onComment();}
break;case 16:handleError(1);break;case 15:case 14:break;default:return token;}}}
function handleError(error,skipUntilAfter,skipUntil){if(skipUntilAfter===void 0){skipUntilAfter=[];}
if(skipUntil===void 0){skipUntil=[];}
onError(error);if(skipUntilAfter.length+skipUntil.length>0){var token=_scanner.getToken();while(token!==17){if(skipUntilAfter.indexOf(token)!==-1){scanNext();break;}
else if(skipUntil.indexOf(token)!==-1){break;}
token=scanNext();}}}
function parseString(isValue){var value=_scanner.getTokenValue();if(isValue){onLiteralValue(value);}
else{onObjectProperty(value);}
scanNext();return true;}
function parseLiteral(){switch(_scanner.getToken()){case 11:var tokenValue=_scanner.getTokenValue();var value=Number(tokenValue);if(isNaN(value)){handleError(2);value=0;}
onLiteralValue(value);break;case 7:onLiteralValue(null);break;case 8:onLiteralValue(true);break;case 9:onLiteralValue(false);break;default:return false;}
scanNext();return true;}
function parseProperty(){if(_scanner.getToken()!==10){handleError(3,[],[2,5]);return false;}
parseString(false);if(_scanner.getToken()===6){onSeparator(':');scanNext();if(!parseValue()){handleError(4,[],[2,5]);}}
else{handleError(5,[],[2,5]);}
return true;}
function parseObject(){onObjectBegin();scanNext();var needsComma=false;while(_scanner.getToken()!==2&&_scanner.getToken()!==17){if(_scanner.getToken()===5){if(!needsComma){handleError(4,[],[]);}
onSeparator(',');scanNext();if(_scanner.getToken()===2&&allowTrailingComma){break;}}
else if(needsComma){handleError(6,[],[]);}
if(!parseProperty()){handleError(4,[],[2,5]);}
needsComma=true;}
onObjectEnd();if(_scanner.getToken()!==2){handleError(7,[2],[]);}
else{scanNext();}
return true;}
function parseArray(){onArrayBegin();scanNext();var needsComma=false;while(_scanner.getToken()!==4&&_scanner.getToken()!==17){if(_scanner.getToken()===5){if(!needsComma){handleError(4,[],[]);}
onSeparator(',');scanNext();if(_scanner.getToken()===4&&allowTrailingComma){break;}}
else if(needsComma){handleError(6,[],[]);}
if(!parseValue()){handleError(4,[],[4,5]);}
needsComma=true;}
onArrayEnd();if(_scanner.getToken()!==4){handleError(8,[4],[]);}
else{scanNext();}
return true;}
function parseValue(){switch(_scanner.getToken()){case 3:return parseArray();case 1:return parseObject();case 10:return parseString(true);default:return parseLiteral();}}
scanNext();if(_scanner.getToken()===17){if(options.allowEmptyContent){return true;}
handleError(4,[],[]);return false;}
if(!parseValue()){handleError(4,[],[]);return false;}
if(_scanner.getToken()!==17){handleError(9,[],[]);}
return true;}
exports.visit=visit;function stripComments(text,replaceCh){var _scanner=scanner_1.createScanner(text),parts=[],kind,offset=0,pos;do{pos=_scanner.getPosition();kind=_scanner.scan();switch(kind){case 12:case 13:case 17:if(offset!==pos){parts.push(text.substring(offset,pos));}
if(replaceCh!==undefined){parts.push(_scanner.getTokenValue().replace(/[^\r\n]/g,replaceCh));}
offset=_scanner.getPosition();break;}}while(kind!==17);return parts.join('');}
exports.stripComments=stripComments;function getNodeType(value){switch(typeof value){case 'boolean':return 'boolean';case 'number':return 'number';case 'string':return 'string';case 'object':{if(!value){return 'null';}
else if(Array.isArray(value)){return 'array';}
return 'object';}
default:return 'null';}}
exports.getNodeType=getNodeType;});(function(factory){if(typeof module==="object"&&typeof module.exports==="object"){var v=factory(require,exports);if(v!==undefined)module.exports=v;}
else if(typeof define==="function"&&define.amd){define('jsonc-parser/impl/edit',["require","exports","./format","./parser"],factory);}})(function(require,exports){'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.isWS=exports.applyEdit=exports.setProperty=exports.removeProperty=void 0;var format_1=require("./format");var parser_1=require("./parser");function removeProperty(text,path,options){return setProperty(text,path,void 0,options);}
exports.removeProperty=removeProperty;function setProperty(text,originalPath,value,options){var _a;var path=originalPath.slice();var errors=[];var root=parser_1.parseTree(text,errors);var parent=void 0;var lastSegment=void 0;while(path.length>0){lastSegment=path.pop();parent=parser_1.findNodeAtLocation(root,path);if(parent===void 0&&value!==void 0){if(typeof lastSegment==='string'){value=(_a={},_a[lastSegment]=value,_a);}
else{value=[value];}}
else{break;}}
if(!parent){if(value===void 0){throw new Error('Can not delete in empty document');}
return withFormatting(text,{offset:root?root.offset:0,length:root?root.length:0,content:JSON.stringify(value)},options);}
else if(parent.type==='object'&&typeof lastSegment==='string'&&Array.isArray(parent.children)){var existing=parser_1.findNodeAtLocation(parent,[lastSegment]);if(existing!==void 0){if(value===void 0){if(!existing.parent){throw new Error('Malformed AST');}
var propertyIndex=parent.children.indexOf(existing.parent);var removeBegin=void 0;var removeEnd=existing.parent.offset+existing.parent.length;if(propertyIndex>0){var previous=parent.children[propertyIndex-1];removeBegin=previous.offset+previous.length;}
else{removeBegin=parent.offset+1;if(parent.children.length>1){var next=parent.children[1];removeEnd=next.offset;}}
return withFormatting(text,{offset:removeBegin,length:removeEnd-removeBegin,content:''},options);}
else{return withFormatting(text,{offset:existing.offset,length:existing.length,content:JSON.stringify(value)},options);}}
else{if(value===void 0){return[];}
var newProperty=JSON.stringify(lastSegment)+": "+JSON.stringify(value);var index=options.getInsertionIndex?options.getInsertionIndex(parent.children.map(function(p){return p.children[0].value;})):parent.children.length;var edit=void 0;if(index>0){var previous=parent.children[index-1];edit={offset:previous.offset+previous.length,length:0,content:','+newProperty};}
else if(parent.children.length===0){edit={offset:parent.offset+1,length:0,content:newProperty};}
else{edit={offset:parent.offset+1,length:0,content:newProperty+','};}
return withFormatting(text,edit,options);}}
else if(parent.type==='array'&&typeof lastSegment==='number'&&Array.isArray(parent.children)){var insertIndex=lastSegment;if(insertIndex===-1){var newProperty=""+JSON.stringify(value);var edit=void 0;if(parent.children.length===0){edit={offset:parent.offset+1,length:0,content:newProperty};}
else{var previous=parent.children[parent.children.length-1];edit={offset:previous.offset+previous.length,length:0,content:','+newProperty};}
return withFormatting(text,edit,options);}
else if(value===void 0&&parent.children.length>=0){var removalIndex=lastSegment;var toRemove=parent.children[removalIndex];var edit=void 0;if(parent.children.length===1){edit={offset:parent.offset+1,length:parent.length-2,content:''};}
else if(parent.children.length-1===removalIndex){var previous=parent.children[removalIndex-1];var offset=previous.offset+previous.length;var parentEndOffset=parent.offset+parent.length;edit={offset:offset,length:parentEndOffset-2-offset,content:''};}
else{edit={offset:toRemove.offset,length:parent.children[removalIndex+1].offset-toRemove.offset,content:''};}
return withFormatting(text,edit,options);}
else if(value!==void 0){var edit=void 0;var newProperty=""+JSON.stringify(value);if(!options.isArrayInsertion&&parent.children.length>lastSegment){var toModify=parent.children[lastSegment];edit={offset:toModify.offset,length:toModify.length,content:newProperty};}
else if(parent.children.length===0||lastSegment===0){edit={offset:parent.offset+1,length:0,content:parent.children.length===0?newProperty:newProperty+','};}
else{var index=lastSegment>parent.children.length?parent.children.length:lastSegment;var previous=parent.children[index-1];edit={offset:previous.offset+previous.length,length:0,content:','+newProperty};}
return withFormatting(text,edit,options);}
else{throw new Error("Can not "+(value===void 0?'remove':(options.isArrayInsertion?'insert':'modify'))+" Array index "+insertIndex+" as length is not sufficient");}}
else{throw new Error("Can not add "+(typeof lastSegment!=='number'?'index':'property')+" to parent of type "+parent.type);}}
exports.setProperty=setProperty;function withFormatting(text,edit,options){if(!options.formattingOptions){return[edit];}
var newText=applyEdit(text,edit);var begin=edit.offset;var end=edit.offset+edit.content.length;if(edit.length===0||edit.content.length===0){while(begin>0&&!format_1.isEOL(newText,begin-1)){begin--;}
while(end<newText.length&&!format_1.isEOL(newText,end)){end++;}}
var edits=format_1.format(newText,{offset:begin,length:end-begin},options.formattingOptions);for(var i=edits.length-1;i>=0;i--){var edit_1=edits[i];newText=applyEdit(newText,edit_1);begin=Math.min(begin,edit_1.offset);end=Math.max(end,edit_1.offset+edit_1.length);end+=edit_1.content.length-edit_1.length;}
var editLength=text.length-(newText.length-end)-begin;return[{offset:begin,length:editLength,content:newText.substring(begin,end)}];}
function applyEdit(text,edit){return text.substring(0,edit.offset)+edit.content+text.substring(edit.offset+edit.length);}
exports.applyEdit=applyEdit;function isWS(text,offset){return '\r\n \t'.indexOf(text.charAt(offset))!==-1;}
exports.isWS=isWS;});(function(factory){if(typeof module==="object"&&typeof module.exports==="object"){var v=factory(require,exports);if(v!==undefined)module.exports=v;}
else if(typeof define==="function"&&define.amd){define('jsonc-parser/main',["require","exports","./impl/format","./impl/edit","./impl/scanner","./impl/parser"],factory);}})(function(require,exports){'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.applyEdits=exports.modify=exports.format=exports.printParseErrorCode=exports.stripComments=exports.visit=exports.getNodeValue=exports.getNodePath=exports.findNodeAtOffset=exports.findNodeAtLocation=exports.parseTree=exports.parse=exports.getLocation=exports.createScanner=void 0;var formatter=require("./impl/format");var edit=require("./impl/edit");var scanner=require("./impl/scanner");var parser=require("./impl/parser");exports.createScanner=scanner.createScanner;exports.getLocation=parser.getLocation;exports.parse=parser.parse;exports.parseTree=parser.parseTree;exports.findNodeAtLocation=parser.findNodeAtLocation;exports.findNodeAtOffset=parser.findNodeAtOffset;exports.getNodePath=parser.getNodePath;exports.getNodeValue=parser.getNodeValue;exports.visit=parser.visit;exports.stripComments=parser.stripComments;function printParseErrorCode(code){switch(code){case 1:return 'InvalidSymbol';case 2:return 'InvalidNumberFormat';case 3:return 'PropertyNameExpected';case 4:return 'ValueExpected';case 5:return 'ColonExpected';case 6:return 'CommaExpected';case 7:return 'CloseBraceExpected';case 8:return 'CloseBracketExpected';case 9:return 'EndOfFileExpected';case 10:return 'InvalidCommentToken';case 11:return 'UnexpectedEndOfComment';case 12:return 'UnexpectedEndOfString';case 13:return 'UnexpectedEndOfNumber';case 14:return 'InvalidUnicode';case 15:return 'InvalidEscapeCharacter';case 16:return 'InvalidCharacter';}
return '<unknown ParseErrorCode>';}
exports.printParseErrorCode=printParseErrorCode;function format(documentText,range,options){return formatter.format(documentText,range,options);}
exports.format=format;function modify(text,path,value,options){return edit.setProperty(text,path,value,options);}
exports.modify=modify;function applyEdits(text,edits){for(var i=edits.length-1;i>=0;i--){text=edit.applyEdit(text,edits[i]);}
return text;}
exports.applyEdits=applyEdits;});define('jsonc-parser',['jsonc-parser/main'],function(main){return main;});define('vs/language/json/tokenization',["require","exports","jsonc-parser"],function(require,exports,json){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.TOKEN_COMMENT_LINE=exports.TOKEN_COMMENT_BLOCK=exports.TOKEN_PROPERTY_NAME=exports.TOKEN_VALUE_NUMBER=exports.TOKEN_VALUE_STRING=exports.TOKEN_VALUE_NULL=exports.TOKEN_VALUE_BOOLEAN=exports.TOKEN_DELIM_COMMA=exports.TOKEN_DELIM_COLON=exports.TOKEN_DELIM_ARRAY=exports.TOKEN_DELIM_OBJECT=exports.createTokenizationSupport=void 0;function createTokenizationSupport(supportComments){return{getInitialState:function(){return new JSONState(null,null,false,null);},tokenize:function(line,state,offsetDelta,stopAtOffset){return tokenize(supportComments,line,state,offsetDelta,stopAtOffset);}};}
exports.createTokenizationSupport=createTokenizationSupport;exports.TOKEN_DELIM_OBJECT='delimiter.bracket.json';exports.TOKEN_DELIM_ARRAY='delimiter.array.json';exports.TOKEN_DELIM_COLON='delimiter.colon.json';exports.TOKEN_DELIM_COMMA='delimiter.comma.json';exports.TOKEN_VALUE_BOOLEAN='keyword.json';exports.TOKEN_VALUE_NULL='keyword.json';exports.TOKEN_VALUE_STRING='string.value.json';exports.TOKEN_VALUE_NUMBER='number.json';exports.TOKEN_PROPERTY_NAME='string.key.json';exports.TOKEN_COMMENT_BLOCK='comment.block.json';exports.TOKEN_COMMENT_LINE='comment.line.json';var ParentsStack=(function(){function ParentsStack(parent,type){this.parent=parent;this.type=type;}
ParentsStack.pop=function(parents){if(parents){return parents.parent;}
return null;};ParentsStack.push=function(parents,type){return new ParentsStack(parents,type);};ParentsStack.equals=function(a,b){if(!a&&!b){return true;}
if(!a||!b){return false;}
while(a&&b){if(a===b){return true;}
if(a.type!==b.type){return false;}
a=a.parent;b=b.parent;}
return true;};return ParentsStack;}());var JSONState=(function(){function JSONState(state,scanError,lastWasColon,parents){this._state=state;this.scanError=scanError;this.lastWasColon=lastWasColon;this.parents=parents;}
JSONState.prototype.clone=function(){return new JSONState(this._state,this.scanError,this.lastWasColon,this.parents);};JSONState.prototype.equals=function(other){if(other===this){return true;}
if(!other||!(other instanceof JSONState)){return false;}
return(this.scanError===other.scanError&&this.lastWasColon===other.lastWasColon&&ParentsStack.equals(this.parents,other.parents));};JSONState.prototype.getStateData=function(){return this._state;};JSONState.prototype.setStateData=function(state){this._state=state;};return JSONState;}());function tokenize(comments,line,state,offsetDelta,stopAtOffset){if(offsetDelta===void 0){offsetDelta=0;}
var numberOfInsertedCharacters=0;var adjustOffset=false;switch(state.scanError){case 2:line='"'+line;numberOfInsertedCharacters=1;break;case 1:line='/*'+line;numberOfInsertedCharacters=2;break;}
var scanner=json.createScanner(line);var lastWasColon=state.lastWasColon;var parents=state.parents;var ret={tokens:[],endState:state.clone()};while(true){var offset=offsetDelta+scanner.getPosition();var type='';var kind=scanner.scan();if(kind===17){break;}
if(offset===offsetDelta+scanner.getPosition()){throw new Error('Scanner did not advance, next 3 characters are: '+line.substr(scanner.getPosition(),3));}
if(adjustOffset){offset-=numberOfInsertedCharacters;}
adjustOffset=numberOfInsertedCharacters>0;switch(kind){case 1:parents=ParentsStack.push(parents,0);type=exports.TOKEN_DELIM_OBJECT;lastWasColon=false;break;case 2:parents=ParentsStack.pop(parents);type=exports.TOKEN_DELIM_OBJECT;lastWasColon=false;break;case 3:parents=ParentsStack.push(parents,1);type=exports.TOKEN_DELIM_ARRAY;lastWasColon=false;break;case 4:parents=ParentsStack.pop(parents);type=exports.TOKEN_DELIM_ARRAY;lastWasColon=false;break;case 6:type=exports.TOKEN_DELIM_COLON;lastWasColon=true;break;case 5:type=exports.TOKEN_DELIM_COMMA;lastWasColon=false;break;case 8:case 9:type=exports.TOKEN_VALUE_BOOLEAN;lastWasColon=false;break;case 7:type=exports.TOKEN_VALUE_NULL;lastWasColon=false;break;case 10:var currentParent=parents?parents.type:0;var inArray=currentParent===1;type=lastWasColon||inArray?exports.TOKEN_VALUE_STRING:exports.TOKEN_PROPERTY_NAME;lastWasColon=false;break;case 11:type=exports.TOKEN_VALUE_NUMBER;lastWasColon=false;break;}
if(comments){switch(kind){case 12:type=exports.TOKEN_COMMENT_LINE;break;case 13:type=exports.TOKEN_COMMENT_BLOCK;break;}}
ret.endState=new JSONState(state.getStateData(),scanner.getTokenError(),lastWasColon,parents);ret.tokens.push({startIndex:offset,scopes:type});}
return ret;}});define('vs/language/json/jsonMode',["require","exports","./workerManager","./languageFeatures","./tokenization","./fillers/monaco-editor-core"],function(require,exports,workerManager_1,languageFeatures,tokenization_1,monaco_editor_core_1){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.setupMode=void 0;function setupMode(defaults){var disposables=[];var providers=[];var client=new workerManager_1.WorkerManager(defaults);disposables.push(client);var worker=function(){var uris=[];for(var _i=0;_i<arguments.length;_i++){uris[_i]=arguments[_i];}
return client.getLanguageServiceWorker.apply(client,uris);};function registerProviders(){var languageId=defaults.languageId,modeConfiguration=defaults.modeConfiguration;disposeAll(providers);if(modeConfiguration.documentFormattingEdits){providers.push(monaco_editor_core_1.languages.registerDocumentFormattingEditProvider(languageId,new languageFeatures.DocumentFormattingEditProvider(worker)));}
if(modeConfiguration.documentRangeFormattingEdits){providers.push(monaco_editor_core_1.languages.registerDocumentRangeFormattingEditProvider(languageId,new languageFeatures.DocumentRangeFormattingEditProvider(worker)));}
if(modeConfiguration.completionItems){providers.push(monaco_editor_core_1.languages.registerCompletionItemProvider(languageId,new languageFeatures.CompletionAdapter(worker)));}
if(modeConfiguration.hovers){providers.push(monaco_editor_core_1.languages.registerHoverProvider(languageId,new languageFeatures.HoverAdapter(worker)));}
if(modeConfiguration.documentSymbols){providers.push(monaco_editor_core_1.languages.registerDocumentSymbolProvider(languageId,new languageFeatures.DocumentSymbolAdapter(worker)));}
if(modeConfiguration.tokens){providers.push(monaco_editor_core_1.languages.setTokensProvider(languageId,(0,tokenization_1.createTokenizationSupport)(true)));}
if(modeConfiguration.colors){providers.push(monaco_editor_core_1.languages.registerColorProvider(languageId,new languageFeatures.DocumentColorAdapter(worker)));}
if(modeConfiguration.foldingRanges){providers.push(monaco_editor_core_1.languages.registerFoldingRangeProvider(languageId,new languageFeatures.FoldingRangeAdapter(worker)));}
if(modeConfiguration.diagnostics){providers.push(new languageFeatures.DiagnosticsAdapter(languageId,worker,defaults));}
if(modeConfiguration.selectionRanges){providers.push(monaco_editor_core_1.languages.registerSelectionRangeProvider(languageId,new languageFeatures.SelectionRangeAdapter(worker)));}}
registerProviders();disposables.push(monaco_editor_core_1.languages.setLanguageConfiguration(defaults.languageId,richEditConfiguration));var modeConfiguration=defaults.modeConfiguration;defaults.onDidChange(function(newDefaults){if(newDefaults.modeConfiguration!==modeConfiguration){modeConfiguration=newDefaults.modeConfiguration;registerProviders();}});disposables.push(asDisposable(providers));return asDisposable(disposables);}
exports.setupMode=setupMode;function asDisposable(disposables){return{dispose:function(){return disposeAll(disposables);}};}
function disposeAll(disposables){while(disposables.length){disposables.pop().dispose();}}
var richEditConfiguration={wordPattern:/(-?\d*\.\d\w*)|([^\[\{\]\}\:\"\,\s]+)/g,comments:{lineComment:'//',blockComment:['/*','*/']},brackets:[['{','}'],['[',']']],autoClosingPairs:[{open:'{',close:'}',notIn:['string']},{open:'[',close:']',notIn:['string']},{open:'"',close:'"',notIn:['string']}]};});