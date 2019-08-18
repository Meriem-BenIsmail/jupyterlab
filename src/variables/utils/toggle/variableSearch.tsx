// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { ReactWidget } from '@jupyterlab/apputils';

import { Panel, Widget } from '@phosphor/widgets';

import React, { useState } from 'react';

import { IVariablesModel } from '../../model';

const SEARCH_ITEM = 'jp-Search-item';

export class VariablesSearch extends Panel {
  scope: Widget;
  search: Widget;

  constructor(model: any) {
    super();
    this.addClass('jp-DebuggerSidebarVariable-Search');
    this.node.style.overflow = 'visible';
    this.scope = new VariableScopeSearch();
    this.search = new VariableSearchInput(model);
    this.scope.addClass(SEARCH_ITEM);
    this.scope.node.style.overflow = 'visible';
    this.scope.node.style.width = '100px';
    this.search.addClass(SEARCH_ITEM);
    this.addWidget(this.scope);
    this.addWidget(this.search);
  }
}

const SearchComponent = ({ model }: any) => {
  const [state, setState] = useState('');
  model.filter = state;
  return (
    <div>
      <input
        placeholder="Search..."
        className="jp-DebuggerSidebarVariable-Search-input"
        value={state}
        onChange={e => {
          setState(e.target.value);
        }}
      />
    </div>
  );
};

class VariableSearchInput extends ReactWidget {
  search: string;
  model: IVariablesModel;
  constructor(model: IVariablesModel) {
    super();
    this.model = model;
    this.search = model.filter;
  }

  render() {
    return <SearchComponent model={this.model} />;
  }
}

const VariablesMenu = ({ config }: any) => {
  const [toggleState, setToggle] = useState(false);
  const [scope, setScope] = useState('local');

  const toggle = (e: any) => {
    setToggle(!toggleState);
  };
  const changeScope = (newScope: string) => {
    if (newScope === scope) {
      return;
    }
    setScope(newScope);
    setToggle(false);
  };

  const List = (
    <ul className="jp-MenuComponent">
      <li onClick={e => changeScope('local')} className="jp-menu-item">
        local
      </li>
      <li
        className="jp-MenuComponent-item"
        onClick={e => changeScope('global')}
      >
        global
      </li>
      <li
        className="jp-MenuComponent-item"
        onClick={e => changeScope('built-in')}
      >
        built-in
      </li>
    </ul>
  );

  return (
    <div>
      <span
        onClick={e => toggle(e)}
        className="jp-DebuggerSidebarVariable-Scope-label"
      >
        {scope}
      </span>
      <span className="fa fa-caret-down"></span>
      {toggleState ? List : null}
    </div>
  );
};

class VariableScopeSearch extends ReactWidget {
  showMenu() {
    this._isOpen = !this._isOpen;
    if (this._isOpen) {
      // TODO
    } else {
      // no-op
    }
  }

  render() {
    return <VariablesMenu />;
  }

  private _isOpen = false;
}

// namespace Internal {
//   export function createOptionsNode(): HTMLElement {
//     const optionsIcon = document.createElement('span');
//     optionsIcon.className = 'fa fa-caret-down';
//     const optionLabel = document.createElement('span');

//     const options = document.createElement('div');
//     options.title = 'Options';
//     optionLabel.innerText = 'local';
//     optionLabel.className = 'jp-DebuggerSidebarVariable-Scope-label';
//     options.appendChild(optionLabel);
//     options.appendChild(optionsIcon);
//     return options;
//   }
// }
