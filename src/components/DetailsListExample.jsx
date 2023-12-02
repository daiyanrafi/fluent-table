// src/components/DetailsListExample.jsx
import React, { useState } from 'react';
import { createListItems } from '@fluentui/example-data';
import { Link } from '@fluentui/react/lib/Link';
import { Image, ImageFit } from '@fluentui/react/lib/Image';
import { DetailsList, buildColumns} from '@fluentui/react/lib/DetailsList';
import { mergeStyles } from '@fluentui/react/lib/Styling';
// import '@fluentui/react/dist/css/styles.css';


const DetailsListExample = () => {
  const [state, setState] = useState({
    sortedItems: createListItems(500),
    columns: buildColumns(createListItems(500)),
  });

  const _renderItemColumn = (item, index, column) => {
    const fieldContent = item[column.fieldName];
  
    switch (column.key) {
      case 'thumbnail':
        return <Image src={fieldContent} width={50} height={50} imageFit={ImageFit.cover} />;
  
      case 'name':
        return <Link href="#">{fieldContent}</Link>;
  
      case 'color':
        const statusColor = getStatusColor(fieldContent);
        return (
          <span
            style={{ color: statusColor }}
          >
            {fieldContent}
          </span>
        );
  
      default:
        return <span>{fieldContent}</span>;
    }
  };
  
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'orange';
      case 'Approved':
        return 'green';
      case 'Rejected':
        return 'red';
      default:
        return 'black';
    }
  };  

  const _copyAndSort = (items, columnKey, isSortedDescending) => {
    const key = columnKey;
    const sortedItems = items.slice(0).sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (isSortedDescending) {
        return bValue.localeCompare(aValue);
      } else {
        return aValue.localeCompare(bValue);
      }
    });

    return sortedItems;
  };

  const _onColumnClick = (event, column) => {
    const { columns } = state;
    let { sortedItems } = state;
    let isSortedDescending = column.isSortedDescending;

    // If we've sorted this column, flip the sorting order.
    if (column.isSorted) {
      isSortedDescending = !isSortedDescending;
    }

    // Sort the items.
    sortedItems = _copyAndSort(sortedItems, column.fieldName, isSortedDescending);

    // Update the state with sorted items and column information.
    setState({
      sortedItems: sortedItems,
      columns: columns.map(col => {
        col.isSorted = col.key === column.key;

        if (col.isSorted) {
          col.isSortedDescending = isSortedDescending;
        }

        return col;
      }),
    });
  };

  const _buildColumns = (items) => {
    const columns = buildColumns(items, false, _onColumnClick);

    const thumbnailColumn = columns.find(column => column.name === 'thumbnail');

    // Special case one column's definition.
    if (thumbnailColumn) {
      thumbnailColumn.name = '';
      thumbnailColumn.maxWidth = 50;
      thumbnailColumn.ariaLabel = 'Thumbnail';
      thumbnailColumn.onColumnClick = undefined;
    }

    // Indicate that all columns except the thumbnail column can be sorted,
    // and only the description column should disappear at small screen sizes.
    columns.forEach((column) => {
      if (column.name) {
        column.showSortIconWhenUnsorted = true;
        column.isCollapsible = column.name === 'description';
      }
    });

    return columns;
  };

  const _onColumnHeaderContextMenu = (column, ev) => {
    // console.log(`column ${column!.key} contextmenu opened.`);
    console.log(`column ${column && column.key} contextmenu opened.`);

    // Add your custom logic for context menu if needed
  };

  const _onItemInvoked = (item, index) => {
    alert(`Item ${item.name} at index ${index} has been invoked.`);
    // Add your custom logic for item invocation if needed
  };

  return (
    <DetailsList
      items={state.sortedItems}
      setKey="set"
      columns={state.columns}
      onRenderItemColumn={_renderItemColumn}
      onItemInvoked={_onItemInvoked}
      onColumnHeaderContextMenu={_onColumnHeaderContextMenu}
      ariaLabelForSelectionColumn="Toggle selection"
      ariaLabelForSelectAllCheckbox="Toggle selection for all items"
      checkButtonAriaLabel="select row"
    />
  );
};

export default DetailsListExample;
